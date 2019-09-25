import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { HomePage } from '../home/home';
import { AddPostPage } from '../add-post/add-post';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { AngularFireDatabase } from '@angular/fire/database';
import { firebaseUser } from '../../model/USER';
import { POST } from '../../model/Post';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatPage } from '../chat/chat';



@IonicPage()
@Component({
  selector: 'page-shop-profile',
  templateUrl: 'shop-profile.html',
})
export class ShopProfilePage {

  currentuserId;
  checkUser;
  userId ={};
  user = {} as firebaseUser;
  posts = [];
  postNumber:number=0;

  constructor(
                        public  navCtrl: NavController, 
                        public  menuCtrl: MenuController, 
                        public  navParams: NavParams,
                        public alertCtrl: AlertController,
                        private db: AngularFireDatabase,
                        private Auth: AngularFireAuth
                        ){

      //*******************************************************//
      // Get User as param
      // Get User from firebase according to UserId
      //*******************************************************//
      this.userId             = this.navParams.get('UserId');

      this.db.object(`User/${this.userId}`).snapshotChanges().subscribe(action =>{ 
        let y = action.payload.toJSON();
        y['key'] = action.key;
        
        this.user       = y as firebaseUser;  
        this.user.uid = y['key'];

      });

        // Get current user 
        this.Auth.auth.onAuthStateChanged( (user) => 
        {
            if(user)
            {
              this.currentuserId = user.uid;
              console.log(user.uid);
            }
            else{
              console.log("There is not current user!!");
            }

            //Check currentuserid with userid
            if(this.currentuserId == this.userId)
            {
                this.checkUser = true;
            } else {
                this.checkUser = false;
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
        
          if(y['UserId'] == this.userId)
          {
            this.posts.push(y as POST);
          }

        });    
               this.postNumber = this.posts.length;      
      });

        this.menuCtrl.enable(false);
   }

  // Create alert
  alert(message: string) {
  this.alertCtrl.create({
      subTitle: message,
      buttons: ['حسنا']
    }).present();
  }

  ionViewDidLoad() {
    console.log('Hello Profile Page');
  }
  gotoShopProfilePage(userId){
    this.navCtrl.push(ShopProfilePage,{UserId: userId});
  }
  gotoPostPage(post ){
    this.navCtrl.push(PostPage, {post});
  }

  goToAddPostPage(){
    this.navCtrl.push(AddPostPage);
  }

  backToLastPage()
  {
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot(HomePage);
  }

  gotoChatPage(userid){

    if(this.currentuserId){
      this.navCtrl.push(ChatPage, {UserId: userid});
    } else {
      this.alert('يرجى تسجيل الدخول اولا!');
    }

  }

}

 

