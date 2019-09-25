import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportedPostPage } from './reported-post';

@NgModule({
  declarations: [
    ReportedPostPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportedPostPage),
  ],
})
export class ReportedPostPageModule {}
