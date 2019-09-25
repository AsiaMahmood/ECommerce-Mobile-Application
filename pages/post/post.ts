import { PopoverComponent } from './../../components/popover/popover';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { ChatPage } from '../chat/chat';
import { AngularFireAuth } from '@angular/fire/auth';
import { POST } from '../../model/Post';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post = {} as POST;
  checkUser;
  currentuserId;

  constructor(
                      public navCtrl: NavController, 
                      public navParams: NavParams,
                      public popoverCtrl: PopoverController,
                      private Auth: AngularFireAuth
                      ){

      this.post = this.navParams.get("post");

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
          if(this.currentuserId == this.post.UserId)
          {
              this.checkUser = true;
          } else {
              this.checkUser = false;
          }
      });
  }

  // Send userId to report popover
  presentPopover(myEvent) {
    
    const popover = this.popoverCtrl.create(PopoverComponent ,{post: this.post});
    popover.present({
      ev: myEvent,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  gotoChatPage(userid){
    this.navCtrl.push(ChatPage, {UserId: userid});
  }

}
