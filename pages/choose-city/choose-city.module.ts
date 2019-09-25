import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseCityPage } from './choose-city';

@NgModule({
  declarations: [
    ChooseCityPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseCityPage),
  ],
})
export class ChooseCityPageModule {}
