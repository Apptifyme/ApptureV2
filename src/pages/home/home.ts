import { Component , ViewChild} from '@angular/core';
import { NavController, NavParams,LoadingController ,Slides} from 'ionic-angular';

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
import {RefreshData} from "../../providers/refresh.service";
import {LightboxPage} from '../lightbox/lightbox'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/home.scss'],
  providers:[RefreshData]
})
export class HomePage {
  headerLogo: string;
  @ViewChild(Slides) sliders: Slides;
  slides= [];
  slider1Loading: boolean = true;
  banners: any;
  RSS = [];
  categories = [];
  content=[];
  loading:any;
  phoneNumber=0;
  baseImageUrl="http://business.staging.appturemarket.com/uploads/";
  public allDataPromise: any = [];
  public allObservableData: any = [];

  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, public api: API, public commonServices: commonServices, public rs: RefreshData) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    let headerPromise = this.api.getHeaderLogo();
    this.allDataPromise.push(headerPromise);
    let sliderPromise = this.api.getallsliders()
    this.allDataPromise.push(sliderPromise);
    let promotionsPromise = this.api.getAllPromotions()
    this.allDataPromise.push(promotionsPromise);
    //this.fetchRSSData();
    let frontMenuPromise = this.api.getAllFrontMenu()
    this.allDataPromise.push(frontMenuPromise);
    localforage.getItem("slides").then((result)=>{
      var slide=result?<Array<Object>>result:null;
      if(slide!=null) {

        this.commonServices.slides=slide;
        console.log(this.commonServices.slides);
      }
    })

  }


  ionViewDidLoad() {
    // console.log("Header in Home form service",this.commonServices.headerLogo);
    this.headerLogo = this.commonServices.headerLogo;
    // console.log('ionViewDidLoad HomePage');
    this.slides = this.commonServices.slides;
    console.log(this.slides);
    this.slider1Loading = false;
    this.RSS = this.commonServices.RSSarray;
    this.banners = this.commonServices.banners;
    console.log(this.commonServices.RSSarray);
    this.fetchRSSData();
    // this.sortRssLinks(this.commonServices.AllMenuData);
     this.getAppconfig();
  }
  ngOnInit() {
    // this.rs.refreshData().then(function(){

    // });
  }
  refreshdata(){
    this.slider1Loading = true;

    let home=this;

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   // this.sliders.stopAutoplay();
    localforage.removeItem("allObservbledata").then(function(){
      console.log("refresh call");
      //home.RefreshDataFun.refreshData();
    //  home.rs.refreshData();
      home.loading.present();
      console.log("inside service");
          home.commonServices.slides=[];
       //   home.commonServices.banners=[];
           home.commonServices.AllMenuData=[];
           home.commonServices.menuData=[];
      console.log("data change");
      Observable.forkJoin(home.allDataPromise).subscribe((resPromise) => {
        console.log("inside forkable");
        home.allObservableData = resPromise;
        console.log(home.allObservableData);
        // console.log(this.allObservableData[0]);
        home.allObservableData[0]
            .map(item => {
              if (item.title == 'Header Logo') {
                console.log(item);
                home.commonServices.headerLogo = 'http://business.staging.appturemarket.com/uploads/header-logo/' + item.image;
              }
            });
        // console.log(this.allObservableData[1]);
        // console.log(this.allObservableData[2]);
      //  home.commonServices.slides=[];
        home.commonServices.slides = home.allObservableData[1];
        localforage.setItem("slides",home.commonServices.slides);
         console.log(home.commonServices.slides);
        home.commonServices.banners = home.allObservableData[2].menu;
        localforage.setItem("banners",home.commonServices.banners);
        console.log(home.commonServices.banners);
        // console.log(this.allObservableData[3]);
        var storage=[];
        storage.push(home.allObservableData[1]);
        storage.push(home.allObservableData[2]);
        storage.push(home.allObservableData[3]);
        localforage.setItem("allObservbledata",storage);


        home.commonServices.AllMenuData = home.allObservableData[3];
        localforage.setItem("Allmenudata",home.commonServices.AllMenuData);
        home.allObservableData[3].menu.map(item => {
          if (item.linktypename == "Pages" && home.commonServices.isURL(item.articlename)) {
            home.commonServices.RSSarray.push(item);
          }
          else {
            home.commonServices.menuData.push(item);
          }
        });
        for(var i=0;i<home.commonServices.menuData.length;i++){
          if(home.commonServices.menuData[i].name=="Settings"){
            home.commonServices.menuData[i].name="Scheduler";
          }
          else if(home.commonServices.menuData[i].name=="My Profile"){
            home.commonServices.menuData[i].name="Breaking News";
          }

        }
        localforage.setItem("menuData",home.commonServices.menuData);
        localforage.setItem("RSSarray",home.commonServices.RSSarray);
        home.slider1Loading = false;

        home.loading.dismiss();
     //   home.sliders.startAutoplay();
   //     return new Promise((resolve, reject) => resolve());
      });
      console.log("end");


    })
  }
  getAppconfig() {
    localforage.getItem("slides").then((result)=>{
         var slide=result?<Array<Object>>result:null;
         if(slide!=null) {
           this.commonServices.slides=slide;
           console.log(this.commonServices.slides);
         }
    })

     localforage.getItem("appConfig").then((result)=>{
      this.content = result ? <Array<Object>> result : [];
      console.log("data exist in local forage app confog");
      this.commonServices.appConfig=this.content;
      this.sliders.stopAutoplay();
      return;
    }, (error) => {
      console.log("ERROR: ", error);
    })

    this.api.getHeaderLogo()
      .subscribe(
      response => {
        this.commonServices.appConfig = response;
//        console.log("my Social Data data");
        console.log(this.commonServices.appConfig);
            this.sliders.startAutoplay();
              localforage.setItem("appConfig",response);
               },
      error => console.log(error)
      )

  }

  sortRssLinks(data: any): any {
    // console.log(data);
    data.menu.map((n, index) => {
      if (n.linktypelink != "setting" && n.linktypelink != "contact" && n.linktypelink != "profile") {
        var newmenu = {
          id: n.id,
          name: n.name,
          order: n.order,
          icon: n.icon,
          link_type: n.linktypename,
          articlename: n.articlename,
          typeid: 0,
          link: ''
        };
        switch (n.linktype) {
          case '3':
            newmenu.typeid = n.event;
            break;
          case '6':
            newmenu.typeid = n.gallery;
            break;
          case '8':
            newmenu.typeid = n.video;
            break;
          case '10':
            newmenu.typeid = n.blog;
            break;
          case '2':
            newmenu.typeid = n.article;
            break;
          default:
            newmenu.typeid = 0;
        }
        newmenu.link = n.linktypelink;
        // $rootScope.homeName = 'Home';

        //If there is URL in page name, it means it contains RSS feed links
        if (n.linktypename == "Pages" && this.commonServices.isURL(n.articlename)) {
          // console.log(this.commonServices.RSSarray);

          //  this.commonServices.RSSarray=[];
          console.log(this.commonServices.RSSarray);
          this.commonServices.RSSarray.push(newmenu);

          // console.log(this.commonServices.RSSarray);

          // console.log(n);

        }
        // console.log(this.commonServices.RSSarray);
      }
    });
    //localforage.setItem("RSSArray",this.commonServices.RSSarray);
    // console.log('from sortlinks');
    if (this.RSS.length == 0) {
      this.fetchRSSData();
    }
  }


  fetchRSSData() {
    let promise = [];
    for (let i = 0; i < this.commonServices.RSSarray.length; i++) {
      promise[i] = this.api.getSingleArticle(this.commonServices.RSSarray[i].article)
    }
    console.log(promise)
    // this.commonServices.RSSarray.map((n) => {
    //   if (n.typeid) {
    //     promise[i] = this.api.getSingleArticle(n.typeid)
    //     i++;
    // .subscribe((data) => {
    //   this.RSS.push(data);
    //   this.commonServices.RSS.feeds.push({});
    // });
    //   }
    // });
    let categories = [];
    Observable.forkJoin(promise)
      .subscribe((response) => {
        // console.log("Response:", response);
        this.RSS = [];
        for (var i = 0; i < response.length; i++) {
          // console.log(response[i]);
          if (this.RSS.indexOf(response[i]) === -1) {
            this.RSS.push(response[i]);
            // console.log(response[i]);
          }
        }
        console.log(this.RSS);


        // this.RSS = response;
        let index = 0;
        // this.RSS.map(n => {
        //   n.name = this.commonServices.RSSarray[index].name;
        //   n.typeid = this.commonServices.RSSarray[index].typeid;
        //   var content = n.content.replace(/<[^>]*>/g, '');
        //   content = content.replace(' ', '').toLowerCase();
        //   content = content.replace('nbsp', '');
        //   content = content.replace(/[^a-zA-Z,]/g, "");
        //   n.categories = content.split(',');

        //   n.categories.map(category => categories.push(category));

        // });

        // categories.map(category => {
        //   if (this.categories.indexOf(category) === -1) {
        //     this.categories.push(category);

        //   }
        // });
        this.commonServices.RssData = this.RSS;
        // this.categories.unshift('All');
        // console.log(this.categories);



      });

  }
  goToInside(id: number) {
    // console.log("page Change Article");
    // console.log(id);
    this.navCtrl.push(ArticlePage, { id: id });
  }
  goToPromotion(id: number) {
    // console.log("page Change Article");
    // console.log(id);
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
  pressMe(){
    this.navCtrl.push(LightboxPage,{});
  }
}
