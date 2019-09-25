import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-choose-city',
  templateUrl: 'choose-city.html',
})
export class ChooseCityPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ChooseCityPage;
  cities:Array<{name:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.cities=[ 
                        { name:'بغداد' },
                        { name:'كركوك' },
                        { name:'اربيل' },
                        { name:'الانبار' },
                        { name:'بابل' },
                        { name:'البصرة' },
                        { name:'دهوك' },
                        { name:'ديالى' },
                        { name:'ذي قار' },
                        { name:'السليمانية' },
                        { name:'صلاح الدين' },
                        { name:'كربلاء' },
                        { name:'ميسان' },
                        { name:'نينوى' },
                        { name:'النجف' },
                        { name:'واسط' },
                        { name:'المثنى' },
                        { name:'القادسية' }
                      ];
                      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseCityPage');
  }

  onCancel(){
  }
   
  onChange(){
    this.navCtrl.setRoot(HomePage);
  }

}
