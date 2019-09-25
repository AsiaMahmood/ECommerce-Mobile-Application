import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-reported-post',
  templateUrl: 'reported-post.html',
})
export class ReportedPostPage {

  posts=[];
  constructor(
                      public navCtrl: NavController, 
                      public navParams: NavParams,
                      private db:AngularFireDatabase
                    ){
                        // Get all posts
                        this.db.list('Report').snapshotChanges().subscribe( actions => {
                        
                          actions.forEach( action =>{
  
                              // To get posts from Post table
                              let y = action.payload.toJSON();
                              y['key'] = action.key;
                              this.posts.push(y);
                            }); 
                            this.likeRepeat(this.posts);
                          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportedPostPage');
  }

  likeRepeat(array) {
    const arrayDuplicated = [];
    let element;
    let times = 0;
    
    for(let i = 0 ; i < array.length ; i++) {
      for(let j = 0 ; j < array.length ; j++) {

          if(array[i]['post'] === array[j]['post']) {
          times++;
          element = array[i]['post'];
          }
      
          
          if(times==0){
            console.log(times);
            arrayDuplicated.push(element);
            console.log(arrayDuplicated);
          }
      }
      
      
      times = 0;
    }
    
    
    }

}
