import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {RssPage} from '../pages/rss/rss';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { ArticlePage } from '../pages/article/article';
import { API } from '../providers/api';
import { commonServices } from '../providers/common-services';
import {ImageCategoryPage} from '../pages/image-category/image-category';
import {SocialPage} from '../pages/social/social.ts';
import {EventsPage} from '../pages/events/events.ts';
import {VideoCategoryPage} from '../pages/video-category/video-category'
import {VideoGalleryPage} from '../pages/video-gallery/video-gallery.ts'

@Component({
  templateUrl: 'app.html',
  styleUrls: ['/app.scss']
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LandingPage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public commonServices: commonServices, public api: API) {
    this.initializeApp();
    console.log(this.commonServices);
    //  if(this.commonServices.RSSarray.length==0) {
    //    this.api.getAllFrontMenu().subscribe((data) => {
    //      console.log(data);
    //      data.menu.map(item => {
    //        // console.log(item);
    //        if (item.linktypename == "Pages" && this.commonServices.isURL(item.articlename)) {

    //          this.commonServices.RSSarray.push(item);
    //        }
    //        else {
    //          this.commonServices.menuData.push(item);
    //        }
    //      });
    //      console.log(this.commonServices.menuData);
    //      for(var i=0;i<this.commonServices.menuData.length;i++){
    //                    if(this.commonServices.menuData[i].name=="My Profile"){
    //                      this.commonServices.menuData[i].name="BreakingNews";
    //                    }
    //      }
    //    });
    //    console.log(this.commonServices.RSSarray);
    //  }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  gotoArticle(id: number, name, articlename, article ,linktypelink) {
    console.log(id, name, articlename,article);
    if(linktypelink=="article")
    {
      this.nav.push(ArticlePage, {id: article, name: name, articleName: articlename});
      articlename=null;
    }
    else {
      var str:any;
          switch(linktypelink){
            case 'home':
              str=HomePage;
                  break;
            case 'photogallerycategory':
              str=ImageCategoryPage;
                  break;
            case 'events':
              console.log("event");
              str= EventsPage;
              break;
            case 'videogallerycategory':
              str=VideoGalleryPage;
              break;
            case 'profile':
              str=RssPage;
              break;
            case 'social':
              str=SocialPage;
              break;
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
