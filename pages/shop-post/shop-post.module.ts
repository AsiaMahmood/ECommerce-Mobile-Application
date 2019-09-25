import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPostPage } from './shop-post';

@NgModule({
  declarations: [
    ShopPostPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopPostPage),
  ],
})
export class ShopPostPageModule {}
