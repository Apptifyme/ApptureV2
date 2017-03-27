import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {commonServices} from "../../providers/common-services"

/*
  Generated class for the Lightbox page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lightbox',
  templateUrl: 'lightbox.html'
})
export class LightboxPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , public commonServices: commonServices) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LightboxPage');
  }

}
