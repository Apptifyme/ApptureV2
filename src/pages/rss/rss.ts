import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {commonServices} from '../../providers/common-services'
import {RssArticlePage} from '../rss-article/rss-article';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ArticlePage} from '../article/article';
import {ImageCategoryPage} from '../image-category/image-category'
/*
  Generated class for the Rss page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rss',
  templateUrl: 'rss.html', styleUrls:['/rss.scss'],
})
export class RssPage {
  baseImageUrl="http://business.staging.appturemarket.com/uploads/";

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonService:commonServices) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RssPage');
  }
  gotoRss(id:number){
    this.navCtrl.push(RssArticlePage,{id:id});
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
      this.navCtrl.push(HomePage,{});

    }
    else {
      console.log("page Change");
      this.navCtrl.push(str,{});
    }
  }

}
