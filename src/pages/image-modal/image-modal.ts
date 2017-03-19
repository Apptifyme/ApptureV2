import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ImageModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-image-modal',
  templateUrl: 'image-modal.html'
})
export class ImageModalPage {
  imageLink:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageModalPage');
    this.imageLink = this.navParams.get('imagesrc');
  }

  closeModal() {
   this.viewCtrl.dismiss();
 }

}
