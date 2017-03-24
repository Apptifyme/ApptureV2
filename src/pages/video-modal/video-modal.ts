import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

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
  id: any;
  rotation:any;
  baseUrl: any;
  url: any;
  devHeight:any;
  devWidth:any;
  rotateVideo:any={};
  buttonRotate:any={};
  baseUrl1 = "https://www.youtube.com/embed/";
  landscape:any;
  constructor(public navCtrl: NavController,public platform:Platform, public navParams: NavParams, public viewCtrl: ViewController) {
    //window.screen.lockOrientation("landscape");
    this.id = this.navParams.get('id');
    console.log(this.id);
    console.log(this.id.url);
    // this.baseUrl="https://www.youtube.com/embed/WWFLRAh7aUs";
    this.url = this.baseUrl1 + this.id.url;
    this.rotation = this.id.orientation;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoModalPage');
    if (this.rotation == '2') {
      console.log('landscape');
      this.devHeight = this.platform.height();
      this.devWidth = this.platform.width();
      this.rotateVideo = {
        'top': 0 + 'px', 'width': this.devHeight + 'px', 'height': this.devWidth + 'px',
        'transform': 'translate(' + (this.devWidth - this.devHeight) / 2 + 'px,' + (this.devHeight - this.devWidth) / 2 + 'px) rotate(90deg)'
      };
      this.landscape = true;
    }
    else {
      console.log('portrait');
      this.rotateVideo = {};
      this.buttonRotate = {};
      this.landscape = false;
    }
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
}
