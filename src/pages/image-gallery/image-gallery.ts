import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { commonServices } from '../../providers/common-services';
import { API } from '../../providers/api';

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
  photoCategories:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: API, public commonServices: commonServices) {

  }

  getAllImageCategories(){
    this.api.getImageCategories()
      .map(data => data.json())
      .subscribe((data) => {
        console.log(data);
        this.photoCategories = data;
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
    this.getAllImageCategories();
  }

}
