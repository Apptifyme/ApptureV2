import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Device, Splashscreen } from 'ionic-native';
//import { Config } from '../../providers/config.ts';
//import { MyServices } from "../../providers/my-services";

// declare var require: Function;
// const localforage: LocalForage = require('localforage');

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
  providers:[]
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.platform = platform;
    // localforage.config({
    //   name: 'MyApp'
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
    this.getConfigData();
  }

  checkHomeScreen() {

  }

  getConfigData() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        if (Device.platform == "iOS" || Device.platform == "Android") {
          Splashscreen.hide();
        }
      }, 500);
    })




    /*setTimeout(() => {

      localforage.getItem('config').then((foragedata) => {
        if (foragedata) {
          // MyServices.setconfigdata(foragedata);
          Config.data = foragedata;
          // configreload.func();
          this.checkHomeScreen();
        }
        else {
          console.log('else');

          this.myServices.getallfrontmenu().map(response => response.json()).subscribe(data => {
            // MyServices.setconfigdata(data);
            Config.data = data;
            // configreload.func();
            console.log(data);
            localforage.setItem('config', data);
            console.log('landing page');
            this.checkHomeScreen();
          }, err =>{
            console.log(err);
            // $state.go('access.offline')
          })
        }
      })
    }, 3500);*/
  }


}
