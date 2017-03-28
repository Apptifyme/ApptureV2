import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Slides } from 'ionic-angular';

import { API } from '../../providers/api';
import { commonServices } from '../../providers/common-services';
import { Observable } from 'rxjs/Rx';
import { ArticlePage } from '../article/article'
import { ContactPage } from '../contact/contact';
import { VideoCategoryPage } from '../video-category/video-category'
import { EventsPage } from "../events/events";
import { VideoGalleryPage } from "../video-gallery/video-gallery.ts";
import { ImageCategoryPage } from "../image-category/image-category";
import { RssArticlePage } from "../rss-article/rss-article"
import * as localforage from "localforage";
import { RefreshData } from "../../providers/refresh.service";
import { LightboxPage } from '../lightbox/lightbox'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/home.scss'],
  providers: [RefreshData]
})
export class HomePage {
  headerLogo: string;
  @ViewChild(Slides) sliders: Slides;
  slides = [];
  slider1Loading: boolean = true;
  banners: any;
  RSS = [];
  categories = [];
  content = [];
  loading: any={};
  phoneNumber = 0;
  baseImageUrl = "http://business.staging.appturemarket.com/uploads/";
  public allDataPromise: any = [];
  public allObservableData: any = [];

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public api: API, public commonServices: commonServices, public rs: RefreshData) {
    
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.slider1Loading = false;
  }
  ngOnInit() {
  }
  refreshdata() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    let headerPromise = this.api.getHeaderLogo();
    this.allDataPromise.push(headerPromise);
    let sliderPromise = this.api.getallsliders()
    this.allDataPromise.push(sliderPromise);
    let promotionsPromise = this.api.getAllPromotions()
    this.allDataPromise.push(promotionsPromise);
    let frontMenuPromise = this.api.getAllFrontMenu()
    this.allDataPromise.push(frontMenuPromise);

    localforage.removeItem("allObservbledata").then(() => {
      
      this.commonServices.AllMenuData = [];
      this.commonServices.menuData = [];
      
      Observable.forkJoin(this.allDataPromise).subscribe((resPromise) => {
        this.allObservableData = resPromise;
        localforage.setItem("allObservbledata", resPromise);
        this.allObservableData[0]
          .map(item => {
            if (item.title == 'Header Logo') {
              console.log(item);
              this.commonServices.headerLogo = 'http://business.staging.appturemarket.com/uploads/header-logo/' + item.image;
            }
          });
        this.commonServices.slides = this.allObservableData[1];
        this.commonServices.banners = this.allObservableData[2].menu;
        this.commonServices.AllMenuData = this.allObservableData[3];
        
        this.allObservableData[3].menu.map(item => {
          if (item.linktypename == "Pages" && this.commonServices.isURL(item.articlename)) {
            this.commonServices.RSSarray.push(item);
          }
          else {
            this.commonServices.menuData.push(item);
          }
        });
        for (var i = 0; i < this.commonServices.menuData.length; i++) {
          if (this.commonServices.menuData[i].name == "Settings") {
            this.commonServices.menuData[i].name = "Scheduler";
          }
          else if (this.commonServices.menuData[i].name == "My Profile") {
            this.commonServices.menuData[i].name = "Breaking News";
          }

        }
        // localforage.setItem("slides", this.commonServices.slides);
        // localforage.setItem("banners", this.commonServices.banners);
        // localforage.setItem("Allmenudata", this.commonServices.AllMenuData);
        // localforage.setItem("menuData", this.commonServices.menuData);
        // localforage.setItem("RSSarray", this.commonServices.RSSarray);
        this.loading.dismiss();
        this.sliders.startAutoplay();
        //     return new Promise((resolve, reject) => resolve());
      });
      console.log("end");


    })
  }

  goToInside(id: number) {
    this.navCtrl.push(ArticlePage, { id: id });
  }
  goToPromotion(id: number) {
    this.navCtrl.push(ArticlePage, { id: id });
  }
  goToFooterInside(links: any) {
    console.log(links);
    var str: any;
    switch (links.linktypelink) {
      case 'home':
        str = HomePage;
        break;
      case 'contact':
        str = ContactPage;
        break;
      case 'photogallerycategory':
        str = ImageCategoryPage;
        break;
      case 'videogallerycategory':
        str = VideoGalleryPage;
        break;
      case '2':
        str = ArticlePage;
        break;
      //    case 'setting':
      //    str=LightboxPage;
      //     break;
      default:
        links.typeid = 0;

    }
    if (links.name == "Phone Call") {
      window.open('tel:' + ('+1' + this.commonServices.PhoneNo), '_system');
    }
    else if (links.linktypelink == "home") {
      this.navCtrl.push(HomePage, {});

    }
    else {
      console.log("page Change");
      this.navCtrl.push(str, {});
    }
  }

  gotoRss(i: number) {
    // console.log( i);
    this.navCtrl.push(RssArticlePage, { id: i })
  }
  pressMe() {
    this.navCtrl.push(LightboxPage, {});
  }
}
