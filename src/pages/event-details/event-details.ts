import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfEventDetails} from '../event-details/event-deatails.service'

/*
  Generated class for the EventDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {
   eventDetail:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams ,private httpServiceOfEventDetails:HttpServiceOfEventDetails) {
    this.onGetData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
  }
  onGetData(){
    this.httpServiceOfEventDetails.getEventData(1)
        .subscribe(
            responce => {
              this.eventDetail = responce;
              console.log("my Event data");
              console.log(this.eventDetail);

            },
            error => console.log(error)
        )
  }

}
