import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptPage } from './dept';

@NgModule({
  declarations: [
    DeptPage,
  ],
  imports: [
    IonicPageModule.forChild(DeptPage),
  ],
})
export class DeptPageModule {}
