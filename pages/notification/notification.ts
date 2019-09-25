import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationPopComponent } from '../../components/notification-pop/notification-pop';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl:PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(NotificationPopComponent);
    popover.present({
      ev: myEvent
    });
  }

}
