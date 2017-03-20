import {Component, Injectable} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Device, Splashscreen, NativeStorage} from 'ionic-native';
import {API} from '../../providers/api';
import {commonServices} from '../../providers/common-services';
import {Observable} from 'rxjs/Rx';

import {HomePage} from '../../pages/home/home';
import {WalkthroughPage} from '../../pages/walkthrough/walkthrough';

@Component({
    selector: 'page-landing',
    templateUrl: 'landing.html',
    providers: []
})
export class LandingPage {
    public allDataPromise:any = [];
    public allObservableData:any = [];

    constructor(public navCtrl:NavController, public navParams:NavParams, public platform:Platform, public api:API, public commonServices:commonServices) {
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
                console.log(data);
                this.commonServices.footerLinks = data.menu;
            });
        this.checkHomeScreen();
    }

    checkHomeScreen() {
        console.log(this.allDataPromise);
        Observable.forkJoin(this.allDataPromise).subscribe((resPromise) => {

            console.log("all data aa gya bhai");
            this.allObservableData = resPromise;
            console.log(this.allObservableData[0]);
            this.allObservableData[0]
                .map(item => {
                    if (item.title == 'Header Logo') {
                        console.log(item);
                        this.commonServices.headerLogo = 'http://business.staging.appturemarket.com/uploads/header-logo/' + item.image;
                    }
                });
            console.log(this.allObservableData[1]);
            console.log(this.allObservableData[2]);
            this.commonServices.slides = this.allObservableData[1];
            this.commonServices.banners = this.allObservableData[2].menu;
            console.log(this.allObservableData[3]);
            this.commonServices.AllMenuData = this.allObservableData[3];
            this.allObservableData[3].menu.map(item => {
                if (item.linktypename == "Pages" && this.commonServices.isURL(item.articlename)) {
                    this.commonServices.RSSarray.push(item);
                }
                else {
                    this.commonServices.menuData.push(item);
                }
            });
            console.log(this.commonServices.menuData);
            this.checkWalkThroughFlag();
            this.platform.ready().then(() => {
                setTimeout(() => {
                    if (Device.platform == "iOS" || Device.platform == "Android") {
                        Splashscreen.hide();
                    }
                }, 500);
            })
        });
    }

    checkWalkThroughFlag() {
        if (this.platform.is('cordova')) {
            // This will only print when on iOS
            console.log("I'm on device!");
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
        } else {
            this.navCtrl.setRoot(HomePage);
        }
    }

}
