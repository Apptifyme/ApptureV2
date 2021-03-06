import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { API } from '../../providers/api';
import { commonServices } from '../../providers/common-services';
import { Observable } from 'rxjs/Rx';

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
  }

}
