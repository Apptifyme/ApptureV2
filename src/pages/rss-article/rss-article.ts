import { Component, ViewChild, keyframes } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController, ModalController } from 'ionic-angular';
import { commonServices } from '../../providers/common-services'
import { HttpServiceOfRss } from '../rss-article/rss.service'
import { RssSinglePage } from '../rss-single/rss-single';
import { HomePage } from '../home/home';
import { EventsPage } from '../events/events';
import { ContactPage } from '../contact/contact';
import { VideoCategoryPage } from '../video-category/video-category'
import { VideoGalleryPage } from "../video-gallery/video-gallery.ts";
import { ImageCategoryPage } from "../image-category/image-category";
import { ArticlePage } from '../article/article.ts';



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

    i: any;
    @ViewChild(Slides) slides: Slides;
    url = "";
    currentIndex = 0;
    prev = 0;
    watching = { 'id': 0, 'data': {} };
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
        console.log(this.commonServices.RssArticle);
        this.loadRssdata(this.url);
        this.showLoader();

    }
    showLoader() {
        this.loading = this.loadingController.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }
    loadRssdata(url) {
        var flag = false;
        console.log("load RSS data callled");
        if (this.commonServices.RssArticle[this.index] && this.commonServices.RssArticle[this.index].length) {
            //do nothing
            this.loading.dismiss();
        }
        else {
            this.httpserviceOfRss.loadRssdata(url)
                .subscribe(
                response => {
                    // this.temp=true;
                    this.RssData = response;
                    console.log("my Rss data Loaded");
                    console.log(this.RssData);
                    this.loading.dismiss();

                    // if (this.RssData[this.index] == null) {
                    this.commonServices.RssArticle[this.index].items = [];
                    this.commonServices.RssArticle[this.index].items = this.RssData;
                    console.log(this.index);
                    console.log(this.commonServices.RssArticle);
                    this.title = this.RssData.feed.title;
                    // this.httpserviceOfRss.RssContent = this.Rsscontent;
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

                    // }
                    this.watching.id = this.index;
                    this.watching.data = this.RssData;
                    let tempObj = Object.assign({}, this.watching);
                    this.commonServices.AllRssdata.push(tempObj);
                    console.log(this.commonServices.AllRssdata);
                },
                error => console.log(error)
                )
        }
    }
    goToFooterInside(links: any) {
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
        if (links.linktypelink == "Phone Call") {
            //      window.open('tel:' + ('+1' + $rootScope.phoneNumber), '_system');
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
            this.showLoader();
            this.index--;
            this.i--;
            this.url = this.commonServices.RssArticle[this.index].title;
            this.loadRssdata(this.url);
        }



    }
    goRight() {

        console.log("go right");
        console.log(this.index);
        console.log(this.commonServices.RssData.length);
        var j = this.index + 1;
        console.log(j);
        // console.log(this.commonServices.AllRssdata);
        // for(var i=0;i<this.commonServices.AllRssdata.length;i++){
        //     if(this.commonServices.AllRssdata[i].id==j){
        //         console.log("data Already exist");
        //         this.Rsscontent[i]=this.commonServices.AllRssdata[i];
        //         this.slides.slideNext();
        //         return;
        //     }
        // }
        if (this.index < this.commonServices.RssArticle.length) {
            this.showLoader();
            this.index++;
            this.i++;
            this.url = this.commonServices.RssArticle[this.index].title;
            this.loadRssdata(this.url);
        }



    }
    slideChanged() {
        this.title = "";
        this.prev = this.currentIndex;
        this.currentIndex = this.slides.getActiveIndex();
        console.log("slide Change");
        if (this.currentIndex < this.prev) {
            this.goLeft()

        }
        else {
            this.goRight();
        }
    }
    goinsideRSS(id: any, parentIndex: number, childIndex: number) {
        console.log("Inside RSS");
        console.log(id);
        // console.log(j);
        this.navCtrl.push(RssSinglePage, { id: id, parentIndex: parentIndex, title: this.title, childIndex: childIndex });
    }
}
