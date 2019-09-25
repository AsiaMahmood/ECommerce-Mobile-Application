import { User } from './../../model/USER';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';



@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  user = {} as User;
  constructor(
                      private Auth:AngularFireAuth,
                      public navCtrl: NavController,
                      public navParams: NavParams,
                      public alertCtrl:AlertController
                    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  // ResetPassword 
  resetPasswordUser(user:User): Promise<void>
  {
    if(user.email != null)
    {
      return this.Auth.auth.sendPasswordResetEmail(user.email)
      .then( data => {
        console.log('got some data', this.Auth.auth.currentUser);
        this.alert('Check your email to reset your password!');
      })
      .catch( error => {
        console.log('got an error', error);
        this.alert(error.message);
      })
    }
    else
    {
      this.alert('ادخل البريد الالكتروني');
    }
  }

}
