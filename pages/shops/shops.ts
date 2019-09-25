import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopPostPage } from '../shop-post/shop-post';
import { AngularFireDatabase } from '@angular/fire/database';
import {  User } from '../../model/USER';

@IonicPage()
@Component({
  selector: 'page-shops',
  templateUrl: 'shops.html',
})
export class ShopsPage {

  shop;
  check = {} as User;
  count = 0 ;
  constructor(
                      public navCtrl: NavController, 
                      private db: AngularFireDatabase,
                      public navParams: NavParams) {

                        this.db.list('User').snapshotChanges().subscribe(actions => {
                          actions.forEach( action =>{
                              let y = action.payload.toJSON();
                              y['key'] = action.key;
                              this.check = y as User;
                              console.log( 'count: ' , this.check.username );
                              if(y['type'] === 2)
                              {
                                  this.shop = y['username'];
                                  console.log("This is y : " , y['username']);
                              }
                            });  
                      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopsPage');
  }

  openShopProfile(shop){
    this.navCtrl.push(ShopPostPage ,{ "shop": shop});
  }
}
