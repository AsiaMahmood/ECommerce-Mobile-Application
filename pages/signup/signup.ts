import { ChooseCityPage } from './../choose-city/choose-city';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../model/USER';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  password:any;
  user =  {} as User;

  checktype;
  currentuser = this.Auth.auth.currentUser;
  constructor(
                      public navCtrl: NavController, 
                      public navParams: NavParams,
                      private Auth:AngularFireAuth,
                      private db:AngularFireDatabase,
                      public alertCtrl:AlertController
                    ) { }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  // Create alert
  alert(message: string) {
    this.alertCtrl.create({
      subTitle: message,
      buttons: ['تم']
    }).present();
  }

  // SignUp to the app
  signUpUser(user:User,checktype):Promise<any>
  {
      if(checktype)
      {
        // Shop account
        user.type=2;
      }
      else
      {
        //Normal user account
        user.type=1;
      }

      if(user.email != null && user.password !=null)
      {
        return this.Auth.auth.createUserWithEmailAndPassword(user.email , user.password).
        then(newUser => 
          {

            this.db.database.ref(`/User/${newUser.user.uid}/username`).set(user.username);
            this.db.database.ref(`/User/${newUser.user.uid}/email`).set(user.email);
            this.db.database.ref(`/User/${newUser.user.uid}/type`).set(user.type);
            this.db.database.ref(`/User/${newUser.user.uid}/profileImage`).set("assets/imgs/user.jpg");
            this.db.database.ref(`/User/${newUser.user.uid}/coverImage`).set('assets/imgs/background.jpg');
            this.db.database.ref(`/User/${newUser.user.uid}/occupation`).set('مهنة');
            this.db.database.ref(`/User/${newUser.user.uid}/description`).set('الوصف');

          }).then( data => 
          {
            this.alert('تم انشاء الحساب بنجاح');
            this.navCtrl.setRoot( ChooseCityPage );
          })
          .catch( error => {
            console.log('got an error', error);
            this.alert(error.message);
          });

    }
    else
    {
      this.alert('ادخل الايميل او الرمز السري');
    }
}

}
