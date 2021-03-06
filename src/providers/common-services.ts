import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { WindowRef } from '../app/windows-ref';



/*
  Generated class for the CommonServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class commonServices {
  constructor(
    public http: Http,
    private winRef: WindowRef
  ) {
    console.log('Hello CommonServices Provider');
    console.log(this.winRef.nativeWindow);
  }

  headerLogo: string;
  AllMenuData:any = [];
  banners:any = [];
  menuData = [];
  RSSarray = [];
  imageCategories = [];
  adminUrl = 'http://business.staging.appturemarket.com/index.php/json/';
  adminImages = 'http://business.staging.appturemarket.com/uploads/';

  clickedMenuItem = '';
  slides: any;
  adminImage: string = 'http://business.staging.appturemarket.com/uploads/';
  devH = this.winRef.nativeWindow.innerHeight;
  devW = this.winRef.nativeWindow.innerWidth;
  sliderheight = { 'max-height': 0.44 * this.devH + 'px', 'height': 0.44 * this.devH + 'px', 'width': this.devW + 'px' };
  promo_banner = {'max-height': 0.15 * this.devH + 'px', 'height': 0.15 * this.devH + 'px', 'width': this.devW + 'px'};
  RSSCat = {'min-height': this.devW / 2 + 'px'};
  RSS = {
    menuData: [], 
    data: [], 
    feeds: [], 
    categories: []
  };
  footerLinks: any;

  isURL(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
  }

  


}
