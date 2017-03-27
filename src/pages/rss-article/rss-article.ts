import {Component, ViewChild, keyframes} from '@angular/core';
import { NavController, NavParams , Slides ,LoadingController, ModalController } from 'ionic-angular';
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
import * as localforage from "localforage";




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
    title = "";
    index: any;
    RssData: any = [];
    Rsscontent = ["", "", "", "", "", ""];
    public data = [];
    i: any;
    @ViewChild(Slides) slides: Slides;
    url = "";
    currentIndex = 0;
    prev = 0;
    watching = {'id': "", 'data': {}};
    public loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController, public modalController: ModalController, public commonServices: commonServices, public httpserviceOfRss: HttpServiceOfRss) {
        console.log(this.commonServices.RssData);
        this.index = this.navParams.get('id');
        this.i = this.index;
        this.currentIndex = this.index;
        console.log(this.index);
        //this.title=this.commonServices.RssData[this.index].name;
        console.log(this.title);
        this.url = this.commonServices.RssArticle[this.index].title;
        console.log(this.url);
        this.loadRssdata(this.url);
        this.showLoader();


    }

    showLoader() {
        this.loading = this.loadingController.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }
    refreshData(){
        console.log("refresh fnctin called");
        localforage.getItem("RSS").then((result)=> {
            console.log("local forage ayye");
            this.data = result ? <Array<Object>>result : [];
            console.log(this.data);
            localforage.removeItem("RSS");
            this.data.splice(this.index, 1);
            console.log(this.data);
            this.url = this.commonServices.RssArticle[this.index].title;
            localforage.setItem("RSS",this.data);
            this.Rsscontent.splice(this.index,1);
            this.showLoader();
            this.loadRssdata(this.url);

        })
    }

    loadRssdata(url) {
        var flag = false;
        localforage.getItem("RSS").then((result)=>{
            console.log("local forage has something")
              this.data= result?<Array<Object>> result:[];
              for(var i=0;i<this.data.length;i++){
                  if(this.data[i].id==url){
                      console.log("local foarege has data");
                      this.RssData=this.data[i].data;
                      this.title = this.RssData.feed.title;
                      this.Rsscontent[this.index] = this.RssData;
                      this.loading.dismiss();

                      return;

                  }
              }
            console.log("load RSS data callled");
            this.httpserviceOfRss.loadRssdata(url)
                .subscribe(
                    responce => {
                        // this.temp=true;
                        this.RssData = responce;
                        console.log("my Rss data Loaded");
                        console.log(this.RssData);
                        this.loading.dismiss();

                        if (this.Rsscontent[this.index] == "") {
                            this.Rsscontent[this.index] = this.RssData;
                            console.log(this.index);
                            console.log(this.Rsscontent);
                            this.title = this.RssData.feed.title;
                            this.httpserviceOfRss.RssContent = this.Rsscontent;
                            for (var i = 0; i < this.RssData.items.length; i++) {
                                if (this.RssData.items[i].thumbnail == '' && typeof this.RssData.items[i].image == 'undefined') {
                                    this.RssData.items[i].imageLink = this.getBlogImage(this.RssData.items[i].content);
                                    this.RssData.items[i].imageSource = 'pickedFromHtml';
                                }
                                else if (this.RssData.items[i].image.url != 'undefined') {
                                    this.RssData.items[i].imageLink = this.RssData.items[i].image.url;
                                    this.RssData.items[i].imageSource = 'imageUrl';
                                }
                                else {
                                    this.RssData.items[i].imageLink = this.RssData.items[i].thumbnail;
                                    this.RssData.items[i].imageSource = 'thumbnail';
                                }
                            }

                        }
                        this.watching.id = url;
                        this.watching.data = this.RssData;
                        let tempObj = Object.assign({}, this.watching);
                        this.commonServices.AllRssdata.push(tempObj);
                        localforage.setItem("RSS", this.commonServices.AllRssdata);
                        console.log(this.commonServices.AllRssdata);
                    },
                    error => console.log(error)
                )
        })
    }

    goToFfooterInside(links: any) {
        console.log(links);
        var str: any;
        switch (links.linktypelink) {
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
        if (links.linktypelink == "setting") {
            window.open('tel:' + "9088788");
        }
        else if (links.linktypelink == "home") {
            this.navCtrl.push(HomePage, {});

        }
        else {
            console.log("page Change");
            this.navCtrl.push(str, {});
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RssArticlePage');
        this.loading.present();

        var x = this.slides.length();
        console.log(x);
        console.log(this.slides.getActiveIndex());


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

    goLeft() {

        console.log("go left");
        var x = this.slides.length();
        console.log(x);
        console.log("total slides");
        console.log(this.slides.getActiveIndex());


        console.log(this.index);
        var k = this.index - 1;
        console.log(k);
        console.log(this.commonServices.AllRssdata);
        // for(var i=0;i<this.commonServices.AllRssdata.length;i++){
        //     if(this.commonServices.AllRssdata[i].id==k){
        //         console.log("data Already exist");
        //         this.Rsscontent[i]=this.commonServices.AllRssdata[i];
        //         this.slides.slidePrev();
        //         return;
        //     }
        // }
        if (this.index > 0) {

            this.index--;
            this.i--;
            localforage.getItem("RSS").then((result) => {
                this.data = result ? <Array<Object>>result : [];
                this.url = this.commonServices.RssArticle[this.index].title;
                console.log(this.url);
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].id == this.url) {
                        this.Rsscontent[this.index] = this.data[i].data;
                        this.RssData = this.data[i].data;
                        this.title = this.RssData.feed.title;
                        console.log("data in local forage as well");
                        return;
                    }

                }
                for (var i = 0; i < this.commonServices.AllRssdata.length; i++) {
                    if (this.commonServices.AllRssdata[i].id == this.index) {
                        console.log("data exist in service");
                        this.Rsscontent[this.index] = this.commonServices.AllRssdata[i].data;
                        this.RssData = this.commonServices.AllRssdata[i].data;
                        this.title = this.RssData.feed.title;

                        return;

                    }
                }

                this.showLoader();
                this.url = this.commonServices.RssArticle[this.index].title;
                this.loadRssdata(this.url);


            })

        }
    }

    goRight() {

        var x = this.slides.length();
        console.log(x);
        console.log("total slides");
        console.log(this.slides.getActiveIndex());


        console.log("go right");
        console.log(this.index);
        console.log(this.commonServices.RssData.length);
        var j = this.index + 1;
        console.log(j);
        console.log(this.commonServices.AllRssdata);
        // for(var i=0;i<this.commonServices.AllRssdata.length;i++){
        //     if(this.commonServices.AllRssdata[i].id==j){
        //         console.log("data Already exist");
        //         this.Rsscontent[i]=this.commonServices.AllRssdata[i];
        //         this.slides.slideNext();
        //         return;
        //     }
        // }
        if(this.index<5)
        {
            this.index++;
            this.i++;
        localforage.getItem("RSS").then((result) => {
            console.log("In local forage function");
            this.data = result ? <Array<Object>>result : [];
            this.url = this.commonServices.RssArticle[this.index].title;
            console.log(this.url);
            for (var i = 0; i < this.data.length; i++) {
                console.log("In local forage function has something");

                if (this.data[i].id == this.url) {
                    console.log("In local forage function has data");

                    this.Rsscontent[this.index] = this.data[i].data;
                    this.RssData = this.data[i].data;
                    this.title = this.RssData.feed.title;
                    console.log("data in local forage as well");
                    return;
                }

            }
            for (var i = 0; i < this.commonServices.AllRssdata.length; i++) {
                if (this.commonServices.AllRssdata[i].id == this.index) {
                    console.log("data exist in service");
                    this.Rsscontent[this.index] = this.commonServices.AllRssdata[i].data;
                    this.RssData = this.commonServices.AllRssdata[i].data;
                    this.title = this.RssData.feed.title;

                    return;

                }
            }

            this.showLoader();
            this.url = this.commonServices.RssArticle[this.index].title;
            this.loadRssdata(this.url);


        })

    }


}
  slideChanged(){
      console.log(this.slides.getActiveIndex());

    //  this.title="";
      console.log("total slides");
      var x=this.slides.length();
      console.log(x);
      this.prev=this.currentIndex;
      this.currentIndex=this.slides.getActiveIndex();
         console.log("slide Change");
         if(this.currentIndex<this.prev){

             this.goLeft()

         }
         else{
//             this.slides.slidePrev();

             this.goRight();
         }
  }
  goinsideRSS(id:any,i:number,j:number){
      console.log("Inside RSS");
      console.log(id);
      console.log(j);
      this.navCtrl.push(RssSinglePage,{id:id,i:i,title:this.title,j:j});
  }
}
