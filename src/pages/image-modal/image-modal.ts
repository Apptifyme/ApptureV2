import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {commonServices} from '../../providers/common-services';

import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ArticlePage} from '../article/article';
import {ImageCategoryPage} from '../image-category/image-category'

/*
  Generated class for the ImageModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-image-modal',
  templateUrl: 'image-modal.html'
})
export class ImageModalPage {
  imageLink:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, public commonServices:commonServices) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageModalPage');
    this.imageLink = this.navParams.get('imagesrc');
  }

  closeModal() {
   this.viewCtrl.dismiss();
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
    if (links.linktypelink == "setting") {
      window.open('tel:' + "9088788");
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
