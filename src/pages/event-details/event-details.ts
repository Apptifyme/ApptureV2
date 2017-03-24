import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfEventDetails} from '../event-details/event-deatails.service'
import { commonServices } from '../../providers/common-services';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ImageCategoryPage} from "../image-category/image-category";
import {ArticlePage} from '../article/article'
import * as localforage from "localforage";


/*
  Generated class for the EventDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',styleUrls:['/event-details.scss'],
})
export class EventDetailsPage {
   eventDetail:any=[];
   id:any;
    imageurl="http://business.staging.appturemarket.com/uploads/";

    constructor(public navCtrl: NavController, public navParams: NavParams ,private httpServiceOfEventDetails:HttpServiceOfEventDetails,public commonServices:commonServices) {
      this.id=this.navParams.get('id');
    this.onGetData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
  }
  onGetData(){
    this.httpServiceOfEventDetails.getEventData(2)
        .subscribe(
            responce => {
              this.eventDetail = responce;
              console.log("my Event data");
              console.log(this.eventDetail);

            },
            error => console.log(error)
        )
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
            case '2':
                str = ArticlePage;
                break;
            default:
                links.typeid = 0;

        }
        if(links.linktypelink=="Phone Call"){
//      window.open('tel:' + ('+1' + $rootScope.phoneNumber), '_system');
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
