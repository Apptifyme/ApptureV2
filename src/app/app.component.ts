import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { RssPage } from '../pages/rss/rss';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { ArticlePage } from '../pages/article/article';
import { API } from '../providers/api';
import { commonServices } from '../providers/common-services';
import { ImageCategoryPage } from '../pages/image-category/image-category';
import { SocialPage } from '../pages/social/social.ts';
import { EventsPage } from '../pages/events/events.ts';
import { VideoCategoryPage } from '../pages/video-category/video-category'
import { VideoGalleryPage } from '../pages/video-gallery/video-gallery.ts'
import { LightboxPage } from '../pages/lightbox/lightbox'
//import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  templateUrl: 'app.html',
  styleUrls: ['/app.scss'],
  //providers: [InAppBrowser]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LandingPage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public commonServices: commonServices, public api: API) {
    this.initializeApp();
    console.log(this.commonServices);


    if (this.commonServices.RSSarray.length == 0) {
      this.api.getAllFrontMenu().subscribe((data) => {
        console.log(data);
        data.menu.map(item => {
          // console.log(item);
          if (item.linktypename == "Pages" && this.commonServices.isURL(item.articlename)) {
            console.log("RSS DATA COMING");
            this.commonServices.RSSarray.push(item);
            this.api.getSingleArticle(item.article).subscribe(
              response => {
                this.commonServices.RssArticle.push(response);
                console.log("RSS DATA FATcHING");
                //  console.log(this.commonServices.RssArticle[i]);

              },
              error => console.log(error)
            )
          }
          else {
            console.log("MENU DAATA COMIG");

          }
        });
        console.log(this.commonServices.menuData);
        //  this.commonServices.menuData = this.commonServices.menuData.filter(item => ((item.name !== "My Profile") || (item.name!="Settings")));
        for (var i = 0; i < this.commonServices.menuData.length; i++) {
          if (this.commonServices.menuData[i].name == "My Profile" || this.commonServices.menuData[i].name == "Settings") {
            this.commonServices.menuData.splice(i, 1);
          }
        }
      });
      // console.log("RSS ARRAY");
      // console.log(this.commonServices.RSSarray);
      // for(var i=0;i<this.commonServices.RSSarray.length;i++){
      //   this.api.getSingleArticle(this.commonServices.RSSarray[i].article).subscribe( response=>{
      //         this.commonServices.RssArticle.push(response);
      //         console.log(this.commonServices.RssArticle[i]);
      //
      //       },
      //       error=>console.log(error)
      //   )
      // }
      console.log(this.commonServices.RssArticle);
    }


    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  openRSSPage() {
    this.nav.push(RssPage);
  }

  openScheduler() {
    // if (this.platform.is('cordova')) {
    //   const browser = this.iab.create('http://www.appturesoftware.com/booking/', '_blank', 'location=no');
    //   browser.show();
    // }
    // else {
    //   window.open('http://www.appturesoftware.com/booking/', "_blank");
    // }
  }

  gotoArticle(id: number, name, articlename, article, linktypelink) {
    console.log(id, name, articlename, article);
    if (linktypelink == "article") {
      this.nav.push(ArticlePage, { id: article, name: name, articleName: articlename });
      articlename = null;
    }
    else {
      var str: any;
      switch (linktypelink) {
        case 'home':
          str = HomePage;
          break;
        case 'photogallerycategory':
          str = ImageCategoryPage;
          break;
        case 'events':
          console.log("event");
          str = EventsPage;
          break;
        case 'videogallerycategory':
          str = VideoGalleryPage;
          break;
        case 'profile':
          str = RssPage;
          break;
        case 'social':
          str = SocialPage;
          break;
        case 'setting':
          str = LightboxPage;
        default:
          break;


      }
      console.log(str);
      this.nav.push(str);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.commonServices.width = this.platform.width();
      console.log(this.commonServices.width);
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }




}
