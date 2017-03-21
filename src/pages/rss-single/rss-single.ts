import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfRss} from '../rss-article/rss.service'

/*
  Generated class for the RssSingle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rss-single',
  templateUrl: 'rss-single.html'
})
export class RssSinglePage {
 id:any;
 rssData=[];
 i:any;
 title:any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public httpserviceofRss:HttpServiceOfRss) {
    this.id=this.navParams.get('id');
    console.log(this.id);
    this.i=this.navParams.get('i');
    this.title=this.navParams.get('title');
    console.log(this.title);
     this.rssData=this.httpserviceofRss.RssContent;
     console.log(this.rssData);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RssSinglePage');
  }

}
