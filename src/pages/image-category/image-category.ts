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
  selector: 'page-image-category',
  templateUrl: 'image-category.html'
})
export class ImageCategoryPage {
  photoCategories: any = [];
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
    console.log(this.photoCategories )
  }

  getAllImageCategories() {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageGalleryPage');
    this.getAllImageCategories();
  }

}
