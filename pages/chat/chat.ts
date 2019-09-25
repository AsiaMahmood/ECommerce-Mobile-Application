import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content  } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { firebaseUser } from '../../model/USER';
import { CHAT } from '../../model/chat';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  chatBox: any;
  currentuser= {} as firebaseUser;
  toUser = {} as firebaseUser;
  user;
  messages=[];
  message;
  messageData={};
  replyData = {};

  //Time
  hours  = new Date().getHours();
  mints  = new Date().getMinutes();
  ampm = this.hours >= 12 ? 'PM' : 'AM';
  fullTime;

  constructor(
                      public navCtrl: NavController, 
                      public navParams: NavParams,
                      private Auth: AngularFireAuth,
                      private db: AngularFireDatabase
                      ) {
                      //   this.messages = [
                      //     {
                      //       _id: 1,
                      //       date: new Date(),
                      //       userId: this.user._id,
                      //       username: this.user.username,
                      //       pic: this.user.pic,
                      //       text: 'OH CRAP!!'
                      //     },
                      //     
                      //       _id: 2,
                      //       date: new Date(),
                      //       userId: this.toUser._id,
                      //       username: this.toUser.username,
                      //       pic: this.toUser.pic,
                      //       text: 'what??'
                      //     },
                      // ];

      this.chatBox = '';

       // Formated Time
        this.fullTime = this.hours + ':' + this.mints + this.ampm;

      //*******************************************************//
      // Get User(reciever) as param
      // Get User from firebase according to UserId
      //*******************************************************//
      this.toUser.uid  = this.navParams.get('UserId');

      this.db.object(`User/${this.toUser.uid}`).snapshotChanges().subscribe(action =>{ 
        let y = action.payload.toJSON();
        y['key'] = action.key;
        
        this.toUser       = y as firebaseUser;  
        this.toUser.uid = y['key'];
      });

      // Get current user 
      this.Auth.auth.onAuthStateChanged( (user) => 
      {
        if(user)
        {
            this.currentuser.uid= user.uid;
            
            this.db.object(`User/${this.currentuser.uid}`).snapshotChanges().subscribe(action =>{ 
              let y = action.payload.toJSON();
              y['key'] = action.key;
              
              this.currentuser       = y as firebaseUser;  
              this.currentuser.uid = y['key'];
            }); 
        }
        else{
          console.log(" Asia There is not current user!!");
        }
      });

  
  }//end of constructure

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');

    if( this.currentuser.uid < this.toUser.uid)
    {
       
      this.user = this.currentuser.uid+this.toUser.uid;

    } else if(this.currentuser.uid > this.toUser.uid){

      this.user = this.toUser.uid+this.currentuser.uid;

    }//End of if else

    console.log('final:' , this.user);
     //Get all messages
     this.db.list(`chat/${this.user}`).snapshotChanges().subscribe( actions => {
                            
      actions.forEach( action =>{
          // To get messages from chat table
          let y = action.payload.toJSON();
          y['key'] = action.key;
          this.message = y as CHAT;
          this.messages.push(this.message);
          
        }); 
      });
    

  }

  
  send(message) {

    if (message && message !== '') {
      // this.messageService.sendMessage(chatId, message);
     
       this.messageData =
      {
          time: this.fullTime,
          currentuser: this.currentuser.uid,
          messageText: message
        };
     
      this.messages.push(this.messageData);

      //Checking High and low user id
      if( this.currentuser.uid < this.toUser.uid)
    {
       
      this.user = this.currentuser.uid+this.toUser.uid;

    } else if(this.currentuser.uid > this.toUser.uid){

      this.user = this.toUser.uid+this.currentuser.uid;

    }//End of if else

      // Store the message in the databsse
      this.db.list(`chat/${this.user}`).push({
          messageText: message,
          toUser: this.toUser.uid,
          currentuser: this.currentuser.uid,
          time: this.fullTime
      });


      this.content.scrollToBottom();

       setTimeout(() => {
         this.replyData =
          {
            time: this.fullTime,
            username: this.toUser.username,
            messageText: 'Just a quick reply'
          };
        this.messages.push(this.replyData);
        this.content.scrollToBottom();
      }, 100);
    }

    this.chatBox = '';
}

scrollToBottom() {
  setTimeout(() => {
    this.content.scrollToBottom();
  }, 100);
}

}

