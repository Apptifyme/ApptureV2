import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfSocial} from "../social/social.service"
/*
  Generated class for the Social page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-social',
  templateUrl: 'social.html'
})
export class SocialPage {
   social=[];
  constructor(public navCtrl: NavController, public navParams: NavParams , private httpServiceOfSocial : HttpServiceOfSocial) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialPage');
  }




  getSocialContent(){
    this.httpServiceOfSocial.getSocialData()
        .subscribe(
            responce => {
              this.social = responce;
              console.log("my social data fathes");
              console.log(this.social);

            },
            error => console.log(error)
        )

  }
}
