import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ModalController } from 'ionic-angular';
import {HttpServiceOfEvent} from '../events/event.service'
import { commonServices } from '../../providers/common-services';
import {HomePage} from '../home/home';
import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ImageCategoryPage} from "../image-category/image-category";
import {ArticlePage} from '../article/article'
import {EventDetailsPage} from '../event-details/event-details';
import * as localforage from "localforage";


/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',styleUrls:['/events.scss'],
})
export class EventsPage {
    private content=null;
    refresh=false;
    imageurl="http://business.staging.appturemarket.com/uploads/";
   public event:any=[];
   loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public loadingCtrl:LoadingController,public modalCtrl:ModalController, private httpServiceOfEvent:HttpServiceOfEvent ,public commonServices:commonServices) {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });
      this.onGetData();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }
  reFreshdata(){
      this.refresh=true;
      let _this=this;
      console.log("data Refresh");
      localforage.removeItem("EventData").then(function(){

          _this.commonServices.AllEventData=null;
          console.log("error");
          _this.loading = _this.loadingCtrl.create({
              content: 'Please wait...'
          });
          _this.onGetData();


      })

  }
  onGetData(){
      if(this.refresh==false) {

          localforage.getItem("EventData").then((result) => {
              this.content = result ? <Array<Object>> result : null;
              console.log("data exist in local forage");
              if (this.content != null) {
                  this.event = this.content;
              }
              // return;
          }, (error) => {
              console.log("ERROR: ", error);
          })
      }
       if(this.content!=null){
          return;
       }
      if(this.commonServices.AllEventData==null){
          this.loading.present();

          this.httpServiceOfEvent.getEventData(1)
        .subscribe(
            response => {
              this.event = response;
              console.log("my Event data");
              console.log(this.event);
              this.commonServices.AllEventData=this.event;
              localforage.setItem("EventData",this.event);
              this.loading.dismiss();
              this.refresh=false;
            },
            error => console.log(error)
        )
  }
  else{
          console.log("data already exist");
          this.event=this.commonServices.AllEventData;
      }
  }
    gointoEventDetails(id:any){
      console.log("Event Deatails Page");
      this.navCtrl.push(EventDetailsPage,{id:id});

    }    goToFooterInside(links:any){
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
