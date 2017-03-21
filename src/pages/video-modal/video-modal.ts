import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the VideoModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video-modal',
  templateUrl: 'video-modal.html'
})
export class VideoModalPage {
   id:any;
   baseUrl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    this.id=this.navParams.get('id');
    console.log(this.id);
    console.log(this.id.url);
    this.baseUrl="https://www.youtube.com/embed/WWFLRAh7aUs";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoModalPage');
  }

}
