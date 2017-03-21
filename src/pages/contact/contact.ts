/**
 * Created by Bunny on 16-03-2017.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {commonServices} from '../../providers/common-services';

/*
 Generated class for the Conatct page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'contact-events',
    templateUrl: 'contact.html'
})
export class ContactPage {
    data:any;

    constructor(public navCtrl: NavController, public navParams: NavParams , private commonService :commonServices) {
        console.log(this.commonService.appConfig);
        this.data=this.commonService.appConfig[5];
        console.log(this.data);
        this.getmap();
    }
     getmap(){


     }    ionViewDidLoad() {
        console.log('ionViewDidLoad EventsPage');
    }

}
