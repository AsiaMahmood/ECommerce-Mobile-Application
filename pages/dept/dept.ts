import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubdeptPage } from '../subdept/subdept';
import { AngularFireDatabase } from '@angular/fire/database';



@IonicPage()
@Component({
  selector: 'page-dept',
  templateUrl: 'dept.html',
})
export class DeptPage {

  dept = [];
  images: Array<any>;
  
  constructor(
                      public navCtrl: NavController, 
                      public db: AngularFireDatabase,
                      public navParams: NavParams
                      ) 
  {
      this.db.list('Dept').snapshotChanges().subscribe( actions => {
          actions.forEach( action => {
           let y = action.payload.toJSON();
           this.dept.push(y);
            
          });
          console.log("This is y : " , this.dept);
      });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeptPage');
  }

  gotoSubdeptPage()
  {
    this.navCtrl.push(SubdeptPage);
  }

}
