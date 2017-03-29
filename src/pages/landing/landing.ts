import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Device, Splashscreen } from 'ionic-native';
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

        //this.fetchRSSData();
        this.platform.ready().then(() => {
            this.api.getHeaderLogo()
                .subscribe((data) => {
                    // console.log(data);
                    data.map(item => {
                        if (item.title == 'Header Logo') {
                            // console.log(item);
                            this.commonServices.headerLogo = 'http://business.staging.appturemarket.com/uploads/header-logo/' + item.image;
                        }
                        else if (item.title == 'Contact No') {
                            // console.log(item);
                            this.commonServices.PhoneNo = item.text;
                        }
                    });
                });

            this.api.getAllFootermenu()
                .subscribe((data) => {
                    // console.log(data);
                    this.commonServices.footerLinks = data.menu;
                });
            // let home = this;
            localforage.getItem("allObservbledata").then((result) => {
                // console.log(result);
                let Homedata = [];
                Homedata = result ? <Array<Object>>result : null;

                if (Homedata == null) {
                    // console.log("data nhi hai");
                    let sliderPromise = this.api.getallsliders()
                    this.allDataPromise.push(sliderPromise);
                    let promotionsPromise = this.api.getAllPromotions()
                    this.allDataPromise.push(promotionsPromise);
                    let frontMenuPromise = this.api.getAllFrontMenu()
                    this.allDataPromise.push(frontMenuPromise);
                    this.checkHomeScreen();
                }
                else {
                    //    this.checkHomeScreen();
                    this.commonServices.slides = Homedata[0];
                    this.commonServices.banners = Homedata[1].menu;
                    this.commonServices.AllMenuData = Homedata[2];

                    Homedata[2].menu.map(item => {
                        if (item.linktypename == "Pages" && this.commonServices.isURL(item.articlename)) {
                            this.commonServices.RSSarray.push(item);
                        }
                        else {
                            this.commonServices.menuData.push(item);
                        }
                    });

                    this.checkWalkThroughFlag();
                }
            }, )
        })
    }

    checkHomeScreen() {
        // console.log("Inside Check Home Screen");
        Observable.forkJoin(this.allDataPromise).subscribe((resPromise) => {
            this.allObservableData = resPromise;
            this.commonServices.slides = this.allObservableData[0];
            this.commonServices.banners = this.allObservableData[1].menu;
            this.commonServices.AllMenuData = this.allObservableData[2];
            console.log(this.commonServices.AllMenuData)

            localforage.setItem("allObservbledata", resPromise);
            // localforage.setItem("slides", this.commonServices.slides);
            // localforage.setItem("banners", this.commonServices.banners);
            // localforage.setItem("Allmenudata", this.commonServices.AllMenuData);

            this.allObservableData[2].menu.map(item => {
                if (item.linktypename == "Pages" && this.commonServices.isURL(item.articlename)) {
                    this.commonServices.RSSarray.push(item);
                }
                else {
                    if (item.name != 'Settings') {
                        this.commonServices.menuData.push(item);
                    }
                }
            });
            // for (var i = 0; i < this.commonServices.menuData.length; i++) {
            //     if (this.commonServices.menuData[i].name == "Settings") {
            //         this.commonServices.menuData[i].name = "Scheduler";
            //     }
            //     else if (this.commonServices.menuData[i].name == "My Profile") {
            //         this.commonServices.menuData[i].name = "Breaking News";
            //     }
            // }
            // localforage.setItem("menuData", this.commonServices.menuData);
            // localforage.setItem("RSSarray", this.commonServices.RSSarray);
            // console.log(this.commonServices.menuData);
            this.checkWalkThroughFlag();
        });
    }

    checkWalkThroughFlag() {
        if (this.platform.is('cordova')) {
            Splashscreen.hide();

            setTimeout(() => {
                localforage.getItem('walkThroughFlag')
                    .then(
                    data => {
                        // console.log(data);
                        if (data) {
                            this.navCtrl.setRoot(HomePage);
                        } else {
                            this.navCtrl.setRoot(WalkthroughPage);
                        }
                    },
                    error => {
                        // console.error(error);
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