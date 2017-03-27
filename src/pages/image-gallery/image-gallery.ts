import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { commonServices } from '../../providers/common-services';
import { API } from '../../providers/api';
import { ImageModalPage } from '../../pages/image-modal/image-modal';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ArticlePage} from '../article/article';
import {ImageCategoryPage} from '../image-category/image-category'
import * as localforage from "localforage";

/*
  Generated class for the ImageGallery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-image-gallery',
  templateUrl: 'image-gallery.html'
})
export class ImageGalleryPage {
  galleryImages: any = [];
  galleryId: any;
  imageInGallery: any = {};
  public loading: any = {};
  public watcher={id:0,data:[]};
  public content=[];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    public navParams: NavParams, public api: API, public commonServices: commonServices,
    public modalCtrl: ModalController) {
    this.galleryId = navParams.get('galleryId');
    console.log(this.galleryId);
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  processGalleryImages(images) {

    for (let i = 0; i < images.length; i++) {
      images[i].src = this.commonServices.adminImages + images[i].src;
    }
    this.galleryImages = images;
    console.log(this.galleryImages);
    this.watcher.id=this.galleryId;
    this.watcher.data=this.galleryImages;
    this.commonServices.AllGallaryImages.push(this.watcher);
    localforage.setItem("AllGallaryImages",this.commonServices.AllGallaryImages);
    this.loading.dismiss();

  }


  getGalleryImages() {
    localforage.getItem("AllGallaryImages").then((result)=>{
                     this.content=result?<Array<Object>>result:[];
                     for(var i=0;i<this.content.length;i++){
                              if(this.content[i].id==this.galleryId){
                                console.log("data exist in local forage");

                                this.galleryImages=this.content[i].data;
                                console.log(this.galleryImages);
                                return;

                              }

                     }
      for(var i=0;i<this.commonServices.AllGallaryImages.length;i++){
        if(this.commonServices.AllGallaryImages[i].id==this.galleryId){
          console.log("data already exist");
          this.galleryImages=this.commonServices.AllGallaryImages[i].data;
          return;
        }
      }

      this.loading.present();
      this.api.getGalleryImages(this.galleryId)
          .map(data => data.json())
          .subscribe((data) => {
            console.log(data);
            this.processGalleryImages(data.queryresult);
          });
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageGalleryPage');
    this.imageInGallery = { 'width': 0.32 * (this.commonServices.devW - 4) + 'px', 'height': 0.32 * (this.commonServices.devW - 4) + 'px' };
    this.getGalleryImages();
  }

  openImageInModal(image) {
    let profileModal = this.modalCtrl.create(ImageModalPage, { imagesrc: image });
    profileModal.present();
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
