/**
 * Created by Bunny on 16-03-2017.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventsPage');
    }

}
