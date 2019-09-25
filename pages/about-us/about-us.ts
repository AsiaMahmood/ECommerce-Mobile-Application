import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  currentuserId:string;
  suggest:string;
  itemList:AngularFireList<any>;

  // Date
  date: Date = new Date();
  fullDate;

  // Time
  hours  = new Date().getHours();
  mints  = new Date().getMinutes();
  ampm = this.hours >= 12 ? 'pm' : 'am';
  fullTime;
  
  constructor(
                        public    navCtrl: NavController, 
                        public    navParams: NavParams,
                        private   db: AngularFireDatabase,
                        public    alertCtrl: AlertController,
                        private   Auth: AngularFireAuth
                        ) {

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

      // Get Suggestion
      this.itemList = this.db.list("Suggestion");

      
 // Formated Date
    this.fullDate = this.date.toISOString().substring(0,10);

    // Formated Time
    this.fullTime = this.hours + ':' + this.mints + this.ampm;


  }

   // Create alert
   alert(message: string) {
    this.alertCtrl.create({
      subTitle: message,
      buttons: ['حسنا']
    }).present();
  }

  //Send suggestion
  send(suggest: string)
  {
    if(this.currentuserId)
    {
          this.itemList.push({
              UserId:     this.currentuserId,
              Suggest:  this.suggest,
              date:        this.fullDate,
              time:        this.fullTime
          }).then( data => 
              {
                this.alert('شکرا على مقترحك');
              })
              .catch( error => {
                this.alert(error.message);
          });
          this.suggest = '';
    } else {
          this.alert('يرجى تسجيل الدخول اولا!');
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
