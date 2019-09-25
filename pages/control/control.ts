import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { ReportedPostPage } from '../reported-post/reported-post';

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {

  postCounter=0;
  userCounter=0;
  constructor(
                      public navCtrl: NavController, 
                      public navParams: NavParams,
                      private db: AngularFireDatabase
                      ) {
                        this.db.list('Post').snapshotChanges().subscribe( actions => {
                        
                          actions.forEach( action =>{
  
                              this.postCounter= this.postCounter+1;
                            }); 
                            
                          });

                          this.db.list('User').snapshotChanges().subscribe( actions => {
                       
                                this.userCounter= this.userCounter+1;
                  
                          });
                       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlPage');
  }

  gotoReportedPostPage(){
    this.navCtrl.push(ReportedPostPage);
  }

}
