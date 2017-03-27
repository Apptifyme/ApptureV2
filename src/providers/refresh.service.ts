/**
 * Created by Bunny on 24-03-2017.
 */
import {Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {commonServices} from '../providers/common-services';
import * as localforage from "localforage";
import { Observable } from 'rxjs/Rx';
import {API} from '../providers/api'


@Injectable()

export class RefreshData {
    public allDataPromise: any = [];
    public allObservableData: any = [];
    constructor(public http: Http,private commonServices:commonServices, public api:API) {
        let headerPromise = this.api.getHeaderLogo();
        this.allDataPromise.push(headerPromise);
        let sliderPromise = this.api.getallsliders()
        this.allDataPromise.push(sliderPromise);
        let promotionsPromise = this.api.getAllPromotions()
        this.allDataPromise.push(promotionsPromise);
        //this.fetchRSSData();
        let frontMenuPromise = this.api.getAllFrontMenu()
        this.allDataPromise.push(frontMenuPromise);

    }
    refreshData(){
        console.log("inside service");
   //     this.commonServices.slides=[];
    //    this.commonServices.banners=[];
   //     this.commonServices.AllMenuData=[];
        console.log("data change");
        Observable.forkJoin(this.allDataPromise).subscribe((resPromise) => {
           console.log("inside forkable");
            this.allObservableData = resPromise;
            localforage.setItem("allObservbledata",resPromise);
             console.log(this.allObservableData);
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
            return new Promise((resolve, reject) => resolve());
        });
        console.log("end");
    }

}

