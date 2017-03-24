import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { commonServices } from '../../providers/common-services';
import { API } from '../../providers/api';
import { ImageGalleryPage } from '../../pages/image-gallery/image-gallery';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ArticlePage} from '../article/article'
import * as localforage from "localforage";

/*
  Generated class for the ImageGallery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-image-category',
  templateUrl: 'image-category.html'
})
export class ImageCategoryPage {
  photoCategories: any = [];
  public content={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: API, public commonServices: commonServices) {

  }

  processImageCategoryResults(categories) {

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].image && categories[i].image.length) {
        let start = categories[i].image.substr(0, 4);
        if (start != "http") {
          categories[i].image = this.commonServices.adminImages+categories[i].image;
        }
      }
    }
    this.photoCategories = categories;
    this.commonServices.DesingPortFolio=this.photoCategories;
    localforage.setItem("image-category",categories);
    console.log(this.photoCategories )
    console.log(this.commonServices.DesingPortFolio);
  }

  getAllImageCategories() {
    localforage.getItem("image-category").then((result)=>{
       this.content=result?<Array<Object>>result:[];
      console.log("data exist in local forage");
       this.photoCategories=result;
    },(error)=>{
      console.log("Error");
    }
    )
    if (this.commonServices.DesingPortFolio == null) {
      console.log("data not exist")
      this.api.getImageCategories()
          .map(data => data.json())
          .subscribe((data) => {
            console.log(data);
            this.processImageCategoryResults(data.queryresult);

            // data.map(item => {
            //   if (item.title == 'Header Logo') {
            //     console.log(item);
            //     this.commonServices.headerLogo = 'http://business.staging.appturemarket.com/uploads/header-logo/' + item.image;
            //     this.headerLogo = this.commonServices.headerLogo;
            //     console.log(this.headerLogo);
            //   }
            // });
          });
    }
    else{
      this.photoCategories=this.commonServices.DesingPortFolio;
      console.log("data Already exist");
      console.log(this.commonServices.DesingPortFolio);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageGalleryPage');
    this.getAllImageCategories();
  }

  goToGallery(id){
    this.navCtrl.push(ImageGalleryPage, {
        galleryId: id
    });
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
