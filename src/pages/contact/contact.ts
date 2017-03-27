/**
 * Created by Bunny on 16-03-2017.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {commonServices} from '../../providers/common-services';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
//import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ImageCategoryPage} from "../image-category/image-category";
/*
 Generated class for the Conatct page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'contact-events',
    templateUrl: 'contact.html', styleUrls:['/contact.scss'],
})
export class ContactPage {
    data:any={};

    constructor(public navCtrl: NavController, public navParams: NavParams , private commonService :commonServices) {
        console.log(this.commonService.appConfig);
        this.data=this.commonService.appConfig[5];
        console.log(this.data);
        this.getmap();
        console.log(commonService.menuData);
        console.log(commonService.AllMenuData);
        this.data.description=this.commonService.AllMenuData.config[5];
        console.log(this.data.description);
    }
     getmap(){


     }    ionViewDidLoad() {
        console.log('ionViewDidLoad EventsPage');
    }

    goToFfooterInside(links:any){
        console.log(links);
        var str:any;
        switch(links.linktypelink){
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

            default:
                links.typeid = 0;

        }
        if (links.linktypelink == "setting") {
            window.open('tel:' + "9088788");
        }
        else if (links.linktypelink == "home") {
            this.navCtrl.push(HomePage,{});

        }
        else {
            console.log("page Change");
            this.navCtrl.push(str,{});
        }
    }

}
