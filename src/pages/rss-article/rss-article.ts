import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams,Slides,LoadingController, ModalController } from 'ionic-angular';
import {commonServices} from '../../providers/common-services'
import {HttpServiceOfRss} from '../rss-article/rss.service'
import {RssSinglePage} from '../rss-single/rss-single';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ImageCategoryPage} from "../image-category/image-category";
import {ArticlePage} from '../article/article.ts';



/*
  Generated class for the RssArticle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rss-article',
  templateUrl: 'rss-article.html'
})
export class RssArticlePage {
  title="";
  index:any;
  RssData:any=[];
  Rsscontent=["","","","","",""];
  i:any;
    @ViewChild(Slides) slides: Slides;
  url="";
  currentIndex=0;
  prev=0;
  loading:any;
    constructor(public navCtrl: NavController, public navParams: NavParams ,public loadingController:LoadingController,public modalController:ModalController , public commonServices:commonServices , public httpserviceOfRss:HttpServiceOfRss) {
    console.log(this.commonServices.RssData);
    this.index=this.navParams.get('id');
    this.i=this.index;
    this.currentIndex=this.index;
    console.log(this.index);
    //this.title=this.commonServices.RssData[this.index].name;
    console.log(this.title);
    this.url=this.commonServices.RssData[this.index].title;
    console.log(this.url);
     this.loadRssdata(this.url);
        this.loading = this.loadingController.create({
            content: 'Please wait...'
        });

  }
  loadRssdata(url){
    var flag=false;
    console.log("load RSS data callled");
    this.httpserviceOfRss.loadRssdata( url)
        .subscribe(
            responce => {
             // this.temp=true;
              this.RssData = responce;
              console.log("my Rss data Loaded");
              console.log(this.RssData);
                this.loading.dismiss();

                if(this.RssData[this.index]==null) {
                this.Rsscontent[this.index]=this.RssData;
                console.log(this.index);
                console.log(this.Rsscontent);
                this.title=this.RssData.feed.title;
                this.httpserviceOfRss.RssContent=this.Rsscontent;
                for(var i=0;i<this.RssData.items.length;i++){
                    if (this.RssData.items[i].thumbnail == '' && typeof this.RssData.items[i].image == 'undefined') {
                        this.RssData.items[i].imageLink = this.getBlogImage(this.RssData.items[i].content);
                        this.RssData.items[i].imageSource = 'pickedFromHtml';
                    }
                    else if (this.RssData.items[i].image.url != 'undefined') {
                        this.RssData.items[i].imageLink = this.RssData.items[i].image.url;
                        this.RssData.items[i].imageSource = 'imageUrl';
                    }
                    else{
                        this.RssData.items[i].imageLink = this.RssData.items[i].thumbnail;
                        this.RssData.items[i].imageSource = 'thumbnail';
                    }
                }

              }
            },
            error => console.log(error)
        )
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RssArticlePage');
      this.loading.present();

  }
    getBlogImage(htmlString) {
    var string1 = htmlString.substring(htmlString.indexOf('src="'), htmlString.indexOf('"', htmlString.indexOf('src="') + 5));
    var imageString = '';
    if (string1 == '') {
        imageString = 'img/menu.png';
    }
    else {
        imageString = string1.substring(5, string1.length);
    }
    return imageString;
    }
  goLeft(){

      console.log("go left");
      console.log(this.index);
         if(this.index>0) {
             this.index--;
             this.i--;
             this.url=this.commonServices.RssData[this.index].title;
            this.loadRssdata(this.url);
         }



  }
  goRight(){
      this.loading.present();
      console.log("go right");
      console.log(this.index);
      if(this.index<this.commonServices.RssData.length) {
          this.index++;
          this.i++;
          this.url=this.commonServices.RssData[this.index].title;
          this.loadRssdata(this.url);
      }



  }
  slideChanged(){
      this.title="";
      this.prev=this.currentIndex;

      this.currentIndex=this.slides.getActiveIndex();
         console.log("slide Change");
         if(this.currentIndex<this.prev){
             this.goLeft();

         }
         else{
             this.goRight();
         }
  }
  goinsideRSS(id:any,i:number){
      console.log("Inside RSS");
      console.log(id);
      this.navCtrl.push(RssSinglePage,{id:id,i:i,title:this.title});
  }
}
