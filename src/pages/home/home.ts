import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { API } from '../../providers/api';
import { commonServices } from '../../providers/common-services';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
    this.api.getHeaderLogo()
      .map(data => data.json())
      .subscribe((data) => {
        console.log(data);
        data.map(item => {
          if (item.title == 'Header Logo') {
            console.log(item);
            this.commonServices.headerLogo = 'http://business.staging.appturemarket.com/uploads/header-logo/' + item.image;
            this.headerLogo = this.commonServices.headerLogo;
            console.log(this.headerLogo);
          }
        });
      });
    console.log('ionViewDidLoad HomePage');

    this.api.getallsliders()
      .subscribe((data) => {
        console.log(data);
        this.commonServices.slides = data;
        this.slides = data;
        this.slider1Loading = false;
        console.log(this.commonServices.adminImage);
      });

    this.api.getAllPromotions()
      .subscribe((data) => {
        console.log(data.menu);
        this.banners = data.menu;
      });
    
    this.fetchRSSData();

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
      this.sortRssLinks(data);
    });

    this.api.getAllFootermenu()
      .subscribe((data) => {
        console.log(data);
        this.commonServices.footerLinks = data.menu;
      });
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

          this.commonServices.RSSarray.push(newmenu);
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

    //   $localForage.setItem('rssData', $scope.RSS);
    //   $localForage.getItem('rssData').then(function (data) {
    //     // console.log(data);
    //   });
    //   $scope.RSSLoading = false;
    // });
  }



}
