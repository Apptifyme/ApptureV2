import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { API } from '../../providers/api';
import { commonServices } from '../../providers/common-services';
import { Observable } from 'rxjs/Rx';
import {ArticlePage} from '../article/article'
import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {EventsPage} from "../events/events";
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ImageCategoryPage} from "../image-category/image-category";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/home.scss']
})
export class HomePage {
  headerLogo: string;
  slides: any;
  slider1Loading: boolean = true;
  banners: any;
  RSS = [];
  categories = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: API, public commonServices: commonServices) {

  }

  ionViewDidLoad() {
    console.log("Header in Home form service",this.commonServices.headerLogo);
    this.headerLogo = this.commonServices.headerLogo;
    console.log('ionViewDidLoad HomePage');
    this.slides = this.commonServices.slides;
    this.slider1Loading = false;
    this.fetchRSSData();
    this.sortRssLinks(this.commonServices.AllMenuData);
    this.getAppconfig();
  }

  getAppconfig(){

      this.api.getHeaderLogo()
          .subscribe(
              responce => {
                this.commonServices.appConfig = responce;
                console.log("my Social Data data");
                console.log(this.commonServices.appConfig);

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
          console.log(this.commonServices.RSSarray);

        //  this.commonServices.RSSarray=[];
            console.log(this.commonServices.RSSarray);
          this.commonServices.RSSarray.push(newmenu);

          console.log(this.commonServices.RSSarray);

          console.log(n);

        }
        console.log(this.commonServices.RSSarray);
      }
    });
    console.log('from sortlinks');
    this.fetchRSSData();
  }


  fetchRSSData(): void {
    let i = 0;
    let promise = [];
    this.commonServices.RSSarray.map((n) => {
      if (n.typeid) {
        promise[i] = this.api.getSingleArticle(n.typeid)
        i++;
        // .subscribe((data) => {
        //   this.RSS.push(data);
        //   this.commonServices.RSS.feeds.push({});
        // });
      }
    });
    let categories = [];
    Observable.forkJoin(promise)
      .subscribe((response) => {
        console.log("Response:", response);
        this.RSS = response;
        let index = 0;
        this.RSS.map(n => {
          n.name = this.commonServices.RSSarray[index].name;
          n.typeid = this.commonServices.RSSarray[index].typeid;
          var content = n.content.replace(/<[^>]*>/g, '');
          content = content.replace(' ', '').toLowerCase();
          content = content.replace('nbsp', '');
          content = content.replace(/[^a-zA-Z,]/g, "");
          n.categories = content.split(',');

          n.categories.map(category => categories.push(category));

        });

        categories.map( category => {
          if(this.categories.indexOf(category) === -1){
            this.categories.push(category);
          }
        });

        this.categories.unshift('All');
        console.log(this.categories);



      });

  }
  goToInside(id:number){
    console.log("page Change Article");
    console.log(id);
    this.navCtrl.push(ArticlePage,{id:id});
  }
  goToFfooterInside(links:any){
    console.log(links);
    var str:any;
    switch(links.linktypelink){
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
      default:
        links.typeid = 0;

    }
    if(links.linktypelink=="Phone Call"){
//      window.open('tel:' + ('+1' + $rootScope.phoneNumber), '_system');
    }
    else if (links.linktypelink == "home") {
      this.navCtrl.push("HomePage",{});

    }
    else {
      console.log("page Change");
      this.navCtrl.push(str,{});
    }
  }
}
