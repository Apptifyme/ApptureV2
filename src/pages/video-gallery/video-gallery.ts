import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController,ModalController} from 'ionic-angular';
import {HttpServiceOfVideoGallary} from '../video-gallery/video-gallery.service';
import {VideoCategoryPage} from '../video-category/video-category'
import { commonServices } from '../../providers/common-services';
import {ArticlePage} from '../article/article'
import {ContactPage} from '../contact/contact';
import {EventsPage} from "../events/events";
import {ImageCategoryPage} from "../image-category/image-category";
import {HomePage} from '../home/home';


/*
  Generated class for the VideoGallery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video-gallery',
  templateUrl: 'video-gallery.html',styleUrls:['/video-gallary.scss'],
})
export class VideoGalleryPage {
  public baseImageUrl="http://img.youtube.com/vi/";
  public baseImageUrl2="/default.jpg";
    public video:any=[];
    public image=[];
    loading:any;
    watcher={id:0,data:{}};
  constructor(public navCtrl: NavController, public loadCtrl:LoadingController,public modalCtrl:ModalController,public navParams: NavParams , private httpServiceOfVideocategory:HttpServiceOfVideoGallary,public commonServices:commonServices) {

      this.loading = this.loadCtrl.create({
          content: 'Please wait...'
      });
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
            this.navCtrl.push(HomePage,{});

        }
        else {
            console.log("page Change");
            this.navCtrl.push(str,{});
        }
    }
    getVideoCategorydata(){
      if(this.commonServices.ALlVideodata==null) {
          this.loading.present();

          this.httpServiceOfVideocategory.getVideocategoryData(1)
              .subscribe(
                  responce => {
                      this.video = responce;
                      console.log("my Videogallary data loaded");
                      console.log(this.video);
                      this.commonServices.ALlVideodata = this.video;
                      console.log(this.commonServices.ALlVideodata);
                      this.loading.dismiss();
                      this.image = this.video.queryresult[1].url.split(',');
                      console.log(this.image);
                  },
                  error => console.log(error)
              )
      }
      else{
          console.log("data Already exist");
          this.video=this.commonServices.ALlVideodata;
       //   this.loading.dismiss();

      }
    }
    goToImages(id:any,i:number){
        console.log(" Inside video category");
        this.navCtrl.push(VideoCategoryPage,{id:id,i:i});
    }

}
