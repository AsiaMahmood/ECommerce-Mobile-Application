import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { POST } from '../../model/Post';
import { ShopProfilePage } from '../shop-profile/shop-profile';
import { PostPage } from '../post/post';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-my-posts',
  templateUrl: 'my-posts.html',
})
export class MyPostsPage {

  currentuserId;
  posts = [];

  constructor(
                      public navCtrl: NavController, 
                      public navParams: NavParams,
                      private db: AngularFireDatabase,
                      private Auth: AngularFireAuth
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
      //*********************************//
      // Get posts accordeing to userId//
      //*********************************//
      
      this.db.list('Post').snapshotChanges().subscribe( actions => {
        actions.forEach( action =>{

            // To get posts from Post table
            let y = action.payload.toJSON();
            y['key'] = action.key;
          
            if(y['UserId'] == this.currentuserId)
            {
              this.posts.push(y as POST);
            }

          });
      });
  }
                      
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPostsPage');
  }

  gotoShopProfilePage(UserId){
    this.navCtrl.push(ShopProfilePage,{UserId: UserId});
  }
  gotoPostPage(post, currentuser ){
    this.navCtrl.push(PostPage, {post , currentuser});
  }

}
