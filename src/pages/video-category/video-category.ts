import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfVideoCategory} from '../video-category/video-category.service'

/*
  Generated class for the VideoCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video-category',
  templateUrl: 'video-category.html'
})
export class VideoCategoryPage {
  videodata:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams ,private httpServiceOfVideoCategory:HttpServiceOfVideoCategory) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoCategoryPage');
  }

  getVideoCategorydata(){
    this.httpServiceOfVideoCategory.getVideocategoryData(1)
        .subscribe(
            responce => {
              this.videodata = responce;
              console.log("my Videogallary data loaded");
              console.log(this.videodata);


            },
            error => console.log(error)
        )
  }

}
