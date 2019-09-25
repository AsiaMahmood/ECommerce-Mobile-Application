import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostPage } from '../post/post';
import { ShopProfilePage } from '../shop-profile/shop-profile';

@IonicPage()
@Component({
  selector: 'page-shop-post',
  templateUrl: 'shop-post.html',
})
export class ShopPostPage {
  
  shop = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // get parameters
    this.shop = this.navParams.get("shop");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPostPage');
  }

  post(){
    this.navCtrl.push(PostPage);
  }

  openShopProfile(){
    this.navCtrl.push(ShopProfilePage);
  }
}
