import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { commonServices } from '../../providers/common-services';
import { API } from '../../providers/api';
import { ImageModalPage } from '../../pages/image-modal/image-modal';

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
    this.loading.dismiss();
  }


  getGalleryImages() {
    this.api.getGalleryImages(this.galleryId)
      .map(data => data.json())
      .subscribe((data) => {
        console.log(data);
        this.processGalleryImages(data.queryresult);

        // this.photoCategories = data;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageGalleryPage');
    this.loading.present();
    this.imageInGallery = { 'width': 0.32 * (this.commonServices.devW - 4) + 'px', 'height': 0.32 * (this.commonServices.devW - 4) + 'px' };
    this.getGalleryImages();
  }

  openImageInModal(image) {
    let profileModal = this.modalCtrl.create(ImageModalPage, { imagesrc: image });
    profileModal.present();
  }

}
