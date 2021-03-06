import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { ArticlePage } from '../pages/article/article';
import { API } from '../providers/api';
import { commonServices } from '../providers/common-services';
import { ImageCategoryPage } from '../pages/image-category/image-category';



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

    this.api.getAllFrontMenu().subscribe((data) => {
      console.log(data);
      data.menu.map(item => {
        // console.log(item);
        if (item.linktypename == "Pages" && this.commonServices.isURL(item.articlename)) {
          this.commonServices.RSSarray.push(item);
        }
        else {
          this.commonServices.menuData.push(item);
        }
      });
      console.log(this.commonServices.menuData);
    });


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  gotoArticle(id: number, name, articlename) {
    console.log(id, name, articlename);
    this.nav.push(ArticlePage, { id: id, name: name, articleName: articlename });
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
