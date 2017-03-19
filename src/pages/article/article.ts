import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { commonServices } from '../../providers/common-services';

/*
  Generated class for the Article page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-article',
  templateUrl: 'article.html'
})
export class ArticlePage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public commonServices: commonServices) {
    console.log(this.commonServices);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

}
