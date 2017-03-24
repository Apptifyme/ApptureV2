import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController ,ModalController} from 'ionic-angular';
import {HttpServiceOfVideoCategory} from '../video-category/video-category.service';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {ContactPage} from '../contact/contact';
import {ArticlePage} from '../article/article';
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ImageCategoryPage} from "../image-category/image-category";
import {commonServices} from '../../providers/common-services'
import {VideoModalPage} from '../video-modal/video-modal.ts'
import * as localforage from "localforage";

/*
  Generated class for the VideoCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-video-category',
  templateUrl: 'video-category.html',styleUrls:['/video-category.scss'],
})
export class VideoCategoryPage {
  videodata:any=[];
  id:any;
  uinurl=[];
  i:number;
  par:number;
  par1:any;
  url1:any;
  arr=[];
  content=[];
    watching={id:0,article:{}};
    public baseImageUrl="http://img.youtube.com/vi/";
    public baseImageUrl2="/default.jpg";
  videoimage='http://business.staging.appturemarket.com/uploads/video-image/';
  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public modalCtrl:ModalController,private httpServiceOfVideoCategory:HttpServiceOfVideoCategory,public commonServices:commonServices) {
      this.id=this.navParams.get('id');
      console.log(this.id);
      this.par1=this.id.id;
      this.url1=this.id.url;
      console.log(this.url1);
      this.i=this.navParams.get('i');
      console.log(this.i);
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });
      this.getVideoCategorydata(this.par1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoCategoryPage');
  }

  getVideoCategorydata(id:number){
      localforage.getItem("AllVideoCategoryData").then((result)=>{
          this.content=result?<Array<Object>>result:[];
          for(var i=0;i<this.content.length;i++){
                if(this.content[i].id==id){
                    console.log("data exist in local forage");
                    this.videodata=this.content[i].article;

                }          }
      })
      for(var i=0;i<this.commonServices.AllVideoCategory.length;i++){
          if(this.commonServices.AllVideoCategory[i].id==id){
              console.log("data already exist");
              this.videodata=this.commonServices.AllVideoCategory[i].article;
              return;
          }

      }
      this.loading.present();

      this.httpServiceOfVideoCategory.getVideocategoryData(id)
        .subscribe(
            response => {
              this.videodata = response;
              console.log("my Videogallary data loaded");
              console.log(this.videodata);
              this.watching.id=id;
              this.watching.article=this.videodata;

              this.commonServices.AllVideoCategory.push(this.watching);
              localforage.setItem("AllVideoCategoryData",this.commonServices.AllVideoCategory);
              console.log(this.commonServices.AllVideoCategory);
              this.arr=this.url1.split(",",this.videodata.queryresult.length);
              console.log(this.arr);
                console.log(this.arr);
                this.loading.dismiss();

            },
            error => console.log(error)
        )
  }
    goToFooterInside(links:any){
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
    openVideo(p:any){
      this.navCtrl.push(VideoModalPage,{id:p});
    }

}
