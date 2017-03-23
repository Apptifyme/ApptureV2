import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';

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
   url:any;
   baseUrl1="https://www.youtube.com/embed/";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.id=this.navParams.get('id');
    console.log(this.id);
    console.log(this.id.url);
    this.baseUrl="https://www.youtube.com/embed/WWFLRAh7aUs";
    this.url=this.baseUrl1+this.id.url;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoModalPage');
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
}
