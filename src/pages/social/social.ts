import { Component } from '@angular/core';
import {commonServices} from '../../providers/common-services'
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfSocial} from "../social/social.service";
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
    m=[];
   social=[];
   n:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams , private httpServiceOfSocial : HttpServiceOfSocial ,public commonService:commonServices) {
      this.n=this.commonService.appConfig[6].text;

      console.log(this.commonService.appConfig[6].text);
      for(var i=0;i<this.n.length;i++)
      {

          switch(this.n[i].name){
              case 'facebookappid':
               //   this.m[i].image = 'img/social/facebook.jpg';
                  this.m.push('img/social/facebook.jpg');
                  break;
              case 'twitterappid':
                 // this.m[i].image = 'img/social/twitter.jpg';
                  this.m.push('img/social/twitter.jpg');

                  break;
              case 'tumblrappid':
                //  this.m[i].image = 'img/social/tumblr.jpg';
                  this.m.push('img/social/tumblr.jpg');

                  break;
              case 'youtubeappid':
              //    this.m[i].image = 'img/social/youtube.jpg';
                  this.m.push('img/social/youtube.jpg');

                  break;
              case 'googleplusappid':
            //      this.m[i].image = 'img/social/googleplus.jpg';
                  this.m.push('img/social/googleplus.jpg');

                  break;
              case 'instagramappid':
                  this.m[i].image = 'img/social/instagram.jpg';
                  break;
          }
      }
  }

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
