import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Device, Splashscreen, NativeStorage } from 'ionic-native';
import { API } from '../../providers/api';
import { commonServices } from '../../providers/common-services';
import { Observable } from 'rxjs/Rx';

import { HomePage } from '../../pages/home/home';
import { WalkthroughPage } from '../../pages/walkthrough/walkthrough';
import * as localforage from "localforage";


@Component({
    selector: 'page-landing',
    templateUrl: 'landing.html',
    providers: []
})
export class LandingPage {
    public allDataPromise: any = [];
    public allObservableData: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public platform: Platform, public api: API, public commonServices: commonServices) {
        this.platform = platform;
    }

    /*fetch all data and hit all API*/

    ionViewDidLoad() {
        let headerPromise = this.api.getHeaderLogo();
        this.allDataPromise.push(headerPromise);
        let sliderPromise = this.api.getallsliders()
        this.allDataPromise.push(sliderPromise);
        let promotionsPromise = this.api.getAllPromotions()
        this.allDataPromise.push(promotionsPromise);
        //this.fetchRSSData();
        let frontMenuPromise = this.api.getAllFrontMenu()
        this.allDataPromise.push(frontMenuPromise);
        this.api.getAllFootermenu()
            .subscribe((data) => {
                // console.log(data);
                this.commonServices.footerLinks = data.menu;
            });
        let home=this;
        localforage.getItem("allObservbledata").then((result)=>{
            console.log(result);
            let data=[];
            data=result? <Array<Object>> result:null;

            if(data==null){
                console.log("data nhi hai");
                home.checkHomeScreen();


            }
            else{
                home.commonServices.slides = data[1];
                home.commonServices.banners = data[2].menu;

                home.commonServices.AllMenuData = data[3];
                home.checkWalkThroughFlag();
                data[0].map(item => {
                        if (item.title == 'Header Logo') {
                            console.log(item);
                            this.commonServices.headerLogo = 'http://business.staging.appturemarket.com/uploads/header-logo/' + item.image;
                        }
                    });

                data[3].menu.map(item => {
                    if (item.linktypename == "Pages" && this.commonServices.isURL(item.articlename)) {
                        home.commonServices.RSSarray.push(item);
                    }
                    else {
                        home.commonServices.menuData.push(item);
                    }
                });
                for(var i=0;i<this.commonServices.menuData.length;i++){
                    if(this.commonServices.menuData[i].name=="Settings"){
                        this.commonServices.menuData[i].name="Scheduler";
                    }
                    else if(this.commonServices.menuData[i].name=="My Profile"){
                        this.commonServices.menuData[i].name="Breaking News";
                    }

                }

                     }
        },)
    }

    checkHomeScreen() {
        // console.log(this.allDataPromise);
        console.log("Inside Check Home Screen");
        Observable.forkJoin(this.allDataPromise).subscribe((resPromise) => {

            this.allObservableData = resPromise;
            localforage.setItem("allObservbledata",resPromise);

            // console.log(this.allObservableData[0]);
            this.allObservableData[0]
                .map(item => {
                    if (item.title == 'Header Logo') {
                        console.log(item);
                        this.commonServices.headerLogo = 'http://business.staging.appturemarket.com/uploads/header-logo/' + item.image;
                    }
                });
            // console.log(this.allObservableData[1]);
            // console.log(this.allObservableData[2]);
            this.commonServices.slides = this.allObservableData[1];
            localforage.setItem("slides",this.commonServices.slides);

            this.commonServices.banners = this.allObservableData[2].menu;
            localforage.setItem("banners",this.commonServices.banners);
            // console.log(this.allObservableData[3]);
            this.commonServices.AllMenuData = this.allObservableData[3];
            localforage.setItem("Allmenudata",this.commonServices.AllMenuData);
            this.allObservableData[3].menu.map(item => {
                if (item.linktypename == "Pages" && this.commonServices.isURL(item.articlename)) {
                    this.commonServices.RSSarray.push(item);
                }
                else {
                    this.commonServices.menuData.push(item);
                }
            });
            localforage.setItem("menuData",this.commonServices.menuData);
            localforage.setItem("RSSarray",this.commonServices.RSSarray);
            // console.log(this.commonServices.menuData);
            this.checkWalkThroughFlag();
            // this.platform.ready().then(() => {
            //     setTimeout(() => {
            //         if (Device.platform == "iOS" || Device.platform == "Android") {
            //             Splashscreen.hide();
            //         }
            //     }, 500);
            // })
        });
    }

    checkWalkThroughFlag() {
        if (this.platform.is('cordova')) {
            // This will only print when on iOS
            // console.log("I'm on device!");
            Splashscreen.hide();

            setTimeout(() => {
                NativeStorage.getItem('walkThroughFlag')
                    .then(
                    data => {
                        console.log(data);
                        if (data) {
                            this.navCtrl.setRoot(HomePage);
                        } else {
                            this.navCtrl.setRoot(WalkthroughPage);
                        }
                    },
                    error => {
                        console.error(error);
                        this.navCtrl.setRoot(WalkthroughPage);
                    }
                    );
            }, 1000);

        }
         else {
            this.navCtrl.setRoot(HomePage);
        }
    }
}