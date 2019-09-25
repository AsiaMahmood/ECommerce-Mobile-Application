import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';


@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  currentuserId;
  post;
  choice;

  // Date
  date: Date = new Date();
  fullDate;

  // Time
  hours  = new Date().getHours();
  mints  = new Date().getMinutes();
  ampm = this.hours >= 12 ? 'pm' : 'am';
  fullTime;

  constructor(
                      public navCtrl:           NavController, 
                      public navParams:     NavParams,
                      private db:                 AngularFireDatabase,
                      public alertCtrl:          AlertController,
                      private Auth:             AngularFireAuth
                      ){

    this.post  = this.navParams.get('post');
    // Get current user 
    this.Auth.auth.onAuthStateChanged( (user) => 
    {
      if(user)
      {
        this.currentuserId = user.uid;
        console.log(user.uid);
      }
      else{
        console.log(" Asia There is not current user!!");
      }
    });



    // Formated Date
    this.fullDate = this.date.toISOString().substring(0,10);

    // Formated Time
    this.fullTime = this.hours + ':' + this.mints + this.ampm;

      console.log("report page: " , this.currentuserId , " next thing: " , this.post);
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

   // Create alert
   alert(message: string) {
    this.alertCtrl.create({
      subTitle: message,
      buttons: ['حسنا']
    }).present();
  }

  sendReport(){
    //Submet to db
    if(this.currentuserId)
    {
        this.db.list('Report').push({
                user:                   this.currentuserId,
                userReported:    this.post.UserId,
                date:                   this.fullDate,
                time:                   this.fullTime,
                post:                   this.post.key,
                choice:                this.choice
        }).then( data => 
          {
            this.alert('شكرا على الابلاغ سنقوم بمراجعة المحتوى');
            this.choice = '';
          })
          .catch( error => {
            this.alert(error.message);
          });
    } else {
      this.alert('يرجى تسجيل الدخول اولا!');
    }
      

  }
}
