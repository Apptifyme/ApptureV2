import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { HomePage } from '../../pages/home/home';
import * as localforage from "localforage";

/*
 Generated class for the Walkthrough page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-walkthrough',
    templateUrl: 'walkthrough.html'
})
export class WalkthroughPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad WalkthroughPage');
    }

    goToHome() {
        localforage.setItem('walkThroughFlag', true)
        this.navCtrl.setRoot(HomePage);
    }

}
