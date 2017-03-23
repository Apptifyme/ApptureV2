import { Component } from '@angular/core';
import {commonServices} from '../../providers/common-services'
import { NavController, NavParams, Platform } from 'ionic-angular';
import {HttpServiceOfSocial} from "../social/social.service";
//import { InAppBrowser } from '@ionic-native/in-app-browser';

/*
  Generated class for the Social page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
  //providers:[InAppBrowser]
})
export class SocialPage {

   social=[];
   socialData:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams , 
  private httpServiceOfSocial : HttpServiceOfSocial ,public commonService:commonServices,
  /*private iab: InAppBrowser,*/ public plt: Platform) {
      this.socialData=this.commonService.appConfig[6];
       console.log( this.socialData);
      console.log(this.commonService.appConfig[6]);
      for(var i=0;i<this.socialData.length;i++)
      {
          console.log("in for");

          switch(this.socialData[i].name){
              case 'facebookappid':
               //   this.m[i].image = 'img/social/facebook.jpg';
                  console.log("hey");
                  this.socialData[i].image='assets/img/social/facebook.jpg';
                  break;
              case 'twitterappid':
                 // this.m[i].image = 'img/social/twitter.jpg';
                  this.socialData[i].image=('assets/img/social/twitter.jpg');
                  break;
              case 'tumblrappid':
                //  this.m[i].image = 'img/social/tumblr.jpg';
                  this.socialData[i].image=('assets/img/social/tumblr.jpg');
                  break;
              case 'youtubeappid':
              //    this.m[i].image = 'img/social/youtube.jpg';
                  this.socialData[i].image=('assets/img/social/youtube.jpg');
                  break;
              case 'googleplusappid':
            //      this.m[i].image = 'img/social/googleplus.jpg';
                  this.socialData[i].image=('assets/img/social/googleplus.jpg');
                  break;
              case "instagramappid":
                  this.socialData[i].image=('assets/img/social/instagram.jpg');
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

  goSocial(link){
      if (this.plt.is('cordova')) {
            //const browser = this.iab.create(link, '_blank', 'location=yes');
            //browser.show();
    }
    else{
        window.open(link, "_blank");
    }
  }
}
