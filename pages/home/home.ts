import { ShopProfilePage } from './../shop-profile/shop-profile';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { AngularFireDatabase } from '@angular/fire/database';
import { POST } from '../../model/Post';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ChatPage } from '../chat/chat';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts = [];
  checkUser;
  currentuserId;
  constructor(
                      public navCtrl:           NavController,
                      public db:                  AngularFireDatabase,
                      public alertCtrl:               AlertController,
                      public navParams:     NavParams,
                      private Auth:             AngularFireAuth
                      ){
                      // Get all posts
                      this.db.list('Post').snapshotChanges().subscribe( actions => {
                        
                        actions.forEach( action =>{

                            // To get posts from Post table
                            let y = action.payload.toJSON();
                            y['key'] = action.key;
                            this.posts.push(y as POST);
                          }); 
                        });

                      // Get current user 
                      this.Auth.auth.onAuthStateChanged( (user) => 
                      {
                          if(user)
                          {
                            this.currentuserId = user.uid;   
                          }
                          else{
                            console.log("There is not current user!!");
                          }
                      });
  }

    // Create alert
    alert(message: string) {
      this.alertCtrl.create({
        subTitle: message,
        buttons: ['حسنا']
      }).present();
    }

  gotoPostPage(post:POST){
      this.navCtrl.push(PostPage,{ post } );
  }

  gotoShopProfilePage(userId){
      this.navCtrl.push(ShopProfilePage,{UserId: userId});
  }

  gotoChatPage(userid){

    if(this.currentuserId){
      this.navCtrl.push(ChatPage, {UserId: userid});
    } else {
      this.alert('يرجى تسجيل الدخول اولا!');
    }

  }

}
