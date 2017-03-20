import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfVideoGallary} from '../video-gallery/video-gallery.service';
import {VideoCategoryPage} from '../video-category/video-category'
import { commonServices } from '../../providers/common-services';
import {ArticlePage} from '../article/article'
import {ContactPage} from '../contact/contact';
import {EventsPage} from "../events/events";
import {ImageCategoryPage} from "../image-category/image-category";
import {HomePage} from '../home/home'

/*
  Generated class for the VideoGallery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video-gallery',
  templateUrl: 'video-gallery.html'
})
export class VideoGalleryPage {
  public baseImageUrl="http://img.youtube.com/vi/";
  public baseImageUrl2="/default.jpg";
    public video:any=[];
    public image=[];
  constructor(public navCtrl: NavController, public navParams: NavParams , private httpServiceOfVideocategory:HttpServiceOfVideoGallary,public commonServices:commonServices) {
     this.getVideoCategorydata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoGalleryPage');
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
            this.navCtrl.push("HomePage",{});

        }
        else {
            console.log("page Change");
            this.navCtrl.push(str,{});
        }
    }
    getVideoCategorydata(){
      this.httpServiceOfVideocategory.getVideocategoryData(1)
          .subscribe(
              responce => {
                this.video = responce;
                console.log("my Videogallary data loaded");
                console.log(this.video);
                this.image=this.video.queryresult[1].url.split(',');
                console.log(this.image);
              },
              error => console.log(error)
          )
    }
    goToImages(id:number){
        console.log(" Inside video category");
        this.navCtrl.push(VideoCategoryPage,{});
    }

}
