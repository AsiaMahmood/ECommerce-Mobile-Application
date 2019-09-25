import { ResetPasswordPage } from './../reset-password/reset-password';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../model/USER';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignupPage } from '../signup/signup';
import { ChooseCityPage } from './../choose-city/choose-city';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
                      public navCtrl: NavController, 
                      public navParams: NavParams,
                      private Auth:AngularFireAuth,
                      public alertCtrl:AlertController
                    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  
  // Create alert
  alert(message: string) {
    this.alertCtrl.create({
      subTitle: message,
      buttons: ['تم']
    }).present();
  }

// Login Function

loginUser(user:User):Promise<any>
{
  if(user.email != null && user.password !=null)
  {
    return this.Auth.auth.signInWithEmailAndPassword(user.email,user.password).then( data => 
      {
        this.alert('تم تسجيل الدخول بنجاح');
        this.navCtrl.setRoot( ChooseCityPage );
        // user is logged in
      })
      .catch( error => {
        console.log('got an error', error);
        this.alert(error.message);
      })
  }
  else
  {
    this.alert('ادخل البريد الالكتروني والرمز السري');
  }
}

  // Push Sign Up Page
  gotoSignupPage(){
    this.navCtrl.push(SignupPage);
  }

  // Push Reset Password Page
  gotoResetPasswordPage()
  {
    this.navCtrl.push(ResetPasswordPage);
  }

}
