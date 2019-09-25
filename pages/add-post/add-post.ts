import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  cities:Array<{name:string}>;
  path:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
        this.path = "assets/imgs/no-image.png";

       
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
    console.log('ionViewDidLoad AddPostPage');
  }

  choosePicture()
  {


    
  }
  onCancel(){
  }
   
  onChange(){
  }

}
