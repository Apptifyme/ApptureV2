import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../home/home.service";
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({ 
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   responce : string;
   slider : string;
   promotions : string;
   footermenu : string;
  constructor(public navCtrl: NavController, public navParams: NavParams , private httpService:HttpService) {
    console.log("this is home ctrl");
    this.onGetPosts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  onGetPosts() {
    this.httpService.getPosts()
        .subscribe(
            responce => {
              this.responce = responce;
              console.log(this.responce);
            },
            error => console.log(error)
        )

      this.httpService.getSlider()
          .subscribe(
              responce=> {
                  this.slider = responce;
                  console.log("Geting slider array");
                  console.log(this.slider);
              },
              error => console.log(error)

            )

      this.httpService.getPromotions()
          .subscribe(
              responce=> {
                  this.promotions = responce;
                  console.log("Geting promotion array");
                  console.log(this.promotions);
              },
              error => console.log(error)

          )

      this.httpService.getAllFooterMenu()
          .subscribe(
              responce=> {
                  this.footermenu = responce;
                  console.log("Geting FooterArray array");
                  console.log(this.footermenu);
              },
              error => console.log(error)

          )
  }
}
