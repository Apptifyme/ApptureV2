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
import * as localforage from "localforage";


/*
 Generated class for the RssArticle page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-rss-article',
    templateUrl: 'rss-article.html',
    styleUrls: ['/rss-article.scss'],

})
export class RssArticlePage {
    title = "";
    Fulltitle="";
    change = false;
    index: any;
    public RSStemp = [];
    RssData: any = [];
    Rsscontent = ["", "", "", "", "", ""];
    i: any;
    @ViewChild(Slides) slides: Slides;
    url = "";
    RSSdata = [];
    prevState: any = '';
    private slider: JSON;
    currentIndex = 0;
    prev = 0;
    watching = { 'id': 0, 'data': {} };
    public loading: any;
    subtitle="";

    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController, public modalController: ModalController, public commonServices: commonServices, public httpserviceOfRss: HttpServiceOfRss) {
        console.log(this.commonServices.RssData);
        this.index = this.navParams.get('id');
        this.prevState = this.navParams.get('prev');
        this.i = this.index;
        this.currentIndex = this.index;
        console.log(this.index);
        //this.title=this.commonServices.RssData[this.index].name;
        console.log(this.title);
        this.url = this.commonServices.RssArticle[this.index].title;
        console.log(this.commonServices.RssArticle);
        this.loadRssdata(this.url);
        setTimeout(() => {
            this.change = true;

            this.slides.slideTo(this.index, 0);
            // this.change=true;
        }, 500);

        this.showLoader();


    }

    goBack() {
        this.navCtrl.pop();
    }

    goToSlide(i) {
        console.log("Slide Change");
        //        this.slides.slideTo(this.index, 0);
    }

    showLoader() {
        this.loading = this.loadingController.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    splitBy(title, char) {
        let array = title.indexOf(' - ');
        console.log(array);
        console.log('-');

        return title;
    }

    loadRssdata(url) {
        var flag = false;
        var home = this;
        console.log("load RSS data callled");
        localforage.getItem("RSS").then((result) => {
            home.RSStemp = result ? <Array<Object>>result : [];
            for (var i = 0; i < home.RSStemp.length; i++) {
                console.log("local foarage has something");

                if (home.RSStemp[i].id == url) {
                    console.log("local forage has data");
                    //  this.commonServices.RssArticle[this.index].items = [];
                    this.commonServices.RssArticle[this.index].items = home.RSStemp[i].data;
                    this.title = home.RSStemp[i].data.feed.title;
                    this.Fulltitle=this.title;
                    this.title= this.title.replace(/\u2013|\u2014/g, "-");

                    this.title = this.title.substring(0,this.title.indexOf('-')-1);
                    console.log(this.title);
                    console.log(this.Fulltitle)
                    this.subtitle = this.Fulltitle.substring(this.Fulltitle.indexOf('-') + 1);
                    // this.slides.slideTo(this.index,0);
                    console.log(this.subtitle);
                    this.loading.dismiss();
                    return;

                }
            }
            this.httpserviceOfRss.loadRssdata(url)
                .subscribe(
                response => {
                    // this.temp=true;
                    this.RssData = response;
                    this.loading.dismiss();

                    // if (this.RssData[this.index] == null) {
                    this.commonServices.RssArticle[this.index].items = [];
                    this.commonServices.RssArticle[this.index].items = this.RssData;

                    console.log(this.RssData);
                    this.title = this.RssData.feed.title;
                    this.title= this.title.replace(/\u2013|\u2014/g, "-");

                    this.subtitle = this.title.substring(0,this.title.indexOf('-')-1);
                    // this.RssData.feed.title = this.title;
                    // this.title = this.splitBy(this.title, '-');
                    // this.httpserviceOfRss.RssContent = this.Rsscontent;
                    for (var i = 0; i < this.RssData.items.length; i++) {
                        var fullTitle=this.RssData.items[i].title;
                        fullTitle = fullTitle.replace(/\u2013|\u2014/g, "-");
                        if (fullTitle.indexOf('-') != -1) {
                            this.RssData.items[i].title = fullTitle.substring(0, fullTitle.indexOf('-') - 1);
                            this.RssData.items[i].subTitle = fullTitle.substring(fullTitle.indexOf('-') + 1);
                            this.commonServices.RssArticle[this.index].items.items[i].subtitle=this.RssData.items[i].subTitle;
                        }
                        
                        let fullDate = new Date(this.RssData.items[i].pubDate.replace(/\s/, 'T')).toString();
                        let tempArray = fullDate.split(' ');
                        this.RssData.items[i].pubDate = tempArray[0]+", "+tempArray[1]+" "+tempArray[2]+" "+tempArray[3];
                                    // n.subTitle = fullTitle.substring(fullTitle.indexOf('-')+1);
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
                    this.watching.id = url;
                    this.watching.data = this.RssData;
                    let tempObj = Object.assign({}, this.watching);
                    this.commonServices.AllRssdata.push(tempObj);
                    localforage.setItem("RSS", this.commonServices.AllRssdata);
                    // console.log(this.commonServices.AllRssdata);
                },
                error => console.log(error)
                )


        })
    }

    refreshData() {
        // this.slides.slideTo(1,0);
        localforage.getItem("RSS").then((result) => {
            this.commonServices.AllRssdata.splice(this.index, 1);
            this.RSSdata = result ? <Array<Object>>result : [];
            localforage.removeItem("RSS");
            this.RSSdata.splice(this.index, 1);
            this.url = this.commonServices.RssArticle[this.index].title;
            localforage.setItem("RSS", this.RSSdata);
            this.Rsscontent.splice(this.index, 1);
            this.showLoader();
            this.loadRssdata(this.url);

        })
    }

    goToFooterInside(links: any) {
        // console.log(links);
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
        if (links.name == "Phone Call") {
            window.open('tel:' + ('+1' + this.commonServices.PhoneNo), '_system');
        }
        else if (links.linktypelink == "home") {
            this.navCtrl.push(HomePage, {});

        }
        else {
            // console.log("page Change");
            this.navCtrl.push(str, {});
        }
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad RssArticlePage');
        this.goToSlide(this.index);
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
        //  this.change=true;
        // if(this.change!=true){
        //     this.slides.slidePrev();
        //     this.change=false;
        // }
        var k = this.index - 1;
        // for(var i=0;i<this.commonServices.AllRssdata.length;i++){
        //     if(this.commonServices.AllRssdata[i].id==k){
        //         console.log("data Already exist");
        //         this.Rsscontent[i]=this.commonServices.AllRssdata[i];
        //         this.slides.slidePrev();
        //         return;
        //     }
        // }
        if (this.index > 0) {

            this.change = true;
            this.slides.slidePrev();
            this.showLoader();
            this.index--;
            this.i--;
            this.url = this.commonServices.RssArticle[this.index].title;
            this.loadRssdata(this.url);
        }


    }

    goRight() {
        // if(this.change!=true){
        //     this.slides.slideNext();
        //     this.change=false;
        // }
        // console.log(this.index);
        // console.log(this.commonServices.RssData.length);
        var j = this.index + 1;
        // console.log(j);
        // for(var i=0;i<this.commonServices.AllRssdata.length;i++){
        //     if(this.commonServices.AllRssdata[i].id==j){
        //         console.log("data Already exist");
        //         this.Rsscontent[i]=this.commonServices.AllRssdata[i];
        //         this.slides.slideNext();
        //         return;
        //     }
        // }
        if (this.index < this.commonServices.RssArticle.length - 1) {

            this.change = true;
            // console.log("go right");
            this.slides.slideNext();
            this.showLoader();
            this.index++;
            this.i++;
            this.url = this.commonServices.RssArticle[this.index].title;
            this.loadRssdata(this.url);
        }


    }

    slideChanged() {
        if (this.change != true) {
            this.change = false;
            //  this.title = "";
            this.prev = this.currentIndex;
            this.currentIndex = this.slides.getActiveIndex();
            // console.log("slide Change");


            if (this.currentIndex < this.prev) {
                if (this.index > 0) {
                    this.i--;
                    this.index--;
                    this.url = this.commonServices.RssArticle[this.index].title;
                    this.loadRssdata(this.url);
                }

            }
            else {
                if (this.index < this.commonServices.RssArticle.length - 1) {
                    this.i++;
                    this.index++;
                    this.url = this.commonServices.RssArticle[this.index].title;
                    this.loadRssdata(this.url);
                }
            }
        }
        else {
            this.change = false;
        }
    }

    goinsideRSS(id: any, parentIndex: number, childIndex: number) {
        // console.log("Inside RSS");
        // console.log(id);
        // console.log(j);
        this.navCtrl.push(RssSinglePage, { id: id, parentIndex: parentIndex, title: this.title, childIndex: childIndex });
    }
}
