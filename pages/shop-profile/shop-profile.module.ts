import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopProfilePage } from './shop-profile';

@NgModule({
  declarations: [
    ShopProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ShopProfilePage),
  ],
})
export class ShopProfilePageModule {}
