import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfEvent} from '../events/event.service'

/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
   public event:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams , private httpServiceOfEvent:HttpServiceOfEvent) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  onGetData(){
    this.httpServiceOfEvent.getEventData(1)
        .subscribe(
            responce => {
              this.event = responce;
              console.log("my Event data");
              console.log(this.event);

            },
            error => console.log(error)
        )
  }

}
