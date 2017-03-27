import { Component } from '@angular/core';
import { commonServices } from '../../providers/common-services'
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EventsPage } from '../events/events';
import { ContactPage } from '../contact/contact';
import { VideoCategoryPage } from '../video-category/video-category'
import { VideoGalleryPage } from "../video-gallery/video-gallery.ts";
import { ImageCategoryPage } from "../image-category/image-category";
import { ArticlePage } from '../article/article.ts';
//import { InAppBrowser } from '@ionic-native/in-app-browser';

/*
  Generated class for the Social page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-social',
    templateUrl: 'social.html',
  //  providers:[InAppBrowser]
})
export class SocialPage {

    social = [];
    socialData: any = [];
    header: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public commonService: commonServices,
                public plt: Platform) {
        //   public iab:InAppBrowser
        console.log(this.commonService.appConfig);
        this.header = this.commonService.headerLogo;
        this.socialData = JSON.parse(this.commonService.appConfig[6].text);
        console.log(this.commonService.appConfig);
        console.log(this.socialData);
        console.log(this.commonService.appConfig[6]);
        for (var i = 0; i < this.socialData.length; i++) {
            console.log("in for");

            switch (this.socialData[i].name) {
                case 'facebookappid':
                    //   this.m[i].image = 'img/social/facebook.jpg';
                    console.log("hey");
                    this.socialData[i].image = 'assets/img/social/facebook.jpg';
                    break;
                case 'twitterappid':
                    // this.m[i].image = 'img/social/twitter.jpg';
                    this.socialData[i].image = ('assets/img/social/twitter.jpg');
                    break;
                case 'tumblrappid':
                    //  this.m[i].image = 'img/social/tumblr.jpg';
                    this.socialData[i].image = ('assets/img/social/tumblr.jpg');
                    break;
                case 'youtubeappid':
                    //    this.m[i].image = 'img/social/youtube.jpg';
                    this.socialData[i].image = ('assets/img/social/youtube.jpg');
                    break;
                case 'googleplusappid':
                    //      this.m[i].image = 'img/social/googleplus.jpg';
                    this.socialData[i].image = ('assets/img/social/googleplus.jpg');
                    break;
                case "instagramappid":
                    this.socialData[i].image = ('assets/img/social/instagram.jpg');
                    break;
            }
        }
        console.log(this.socialData);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SocialPage');
    }

    goToFooterInside(links: any) {
        console.log(links);
        var str: any;
        switch (links.linktypelink) {
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
        if (links.name == "Phone Call") {
            window.open('tel:' + ('+1' + this.commonService.PhoneNo), '_system');
        }
        else if (links.linktypelink == "home") {
            this.navCtrl.push(HomePage, {});

        }
        else {
            console.log("page Change");
            this.navCtrl.push(str, {});
        }
    }

}

//     goSocial(link) {
//         if (this.plt.is('cordova')) {
//     //        const browser = this.iab.create(link, '_blank', 'location=yes');
//       //      browser.show();
//         }
//         else {
//             window.open(link, "_blank");
//         }
//     }
// }
