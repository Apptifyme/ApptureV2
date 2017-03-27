import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { HttpServiceOfActicle } from '../article/article.service'
import { HttpService } from '../home/home.service';
import { commonServices } from '../../providers/common-services';
import { HomePage } from '../home/home';
import { EventsPage } from '../events/events';
import { ContactPage } from '../contact/contact';
import { VideoCategoryPage } from '../video-category/video-category'
import { VideoGalleryPage } from "../video-gallery/video-gallery.ts";
import { ImageCategoryPage } from "../image-category/image-category";
import * as localforage from "localforage";

@Component({
    selector: 'page-article',
    templateUrl: 'article.html'
})
export class ArticlePage {
    public id: number;
    public article = {};
    phoneNumber: any;
    loading: any;
    watching = { id: 0, article: {} };
    public content = [];
    public articlebaseurl = "http://business.staging.appturemarket.com/uploads/";
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController, private httpServiceOfArticle: HttpServiceOfActicle, private httpServiceOfHome: HttpService, private commonServices: commonServices) {
        this.id = this.navParams.get('id');
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        console.log("in article");
        this.getPageContent(this.id);

        //    console.log(this.commonServices.RssArticle);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArticlePage');
        //this.loading.present();
    }
    getPageContent(id: number) {
        localforage.getItem("ArticlePage").then((result) => {
            console.log("local foareage has something");
            console.log("result");
            this.content = (result ? <Array<Object>>result : []);
            console.log(this.content);
            for (var i = 0; i < this.content.length; i++) {
                if (id == this.content[i].id) {
                    this.article = this.content[i].article;
                    console.log("data exist in local forage");
                    return;

                }
            }
        }, (error) => {
            console.log("ERROR: ", error);

        })


        for (var i = 0; i < this.commonServices.ArticleCompleteData.length; i++) {
            if (id == this.commonServices.ArticleCompleteData[i].id) {
                this.article = this.commonServices.ArticleCompleteData[i].article;
                console.log("data Already exist");
                //           this.loading.dismiss();
                return;

            }
        }
        this.loading.present();
        this.httpServiceOfArticle.getArticleData(id)
            .subscribe(
            response => {

                this.article = response;
                this.watching.id = id;
                this.watching.article = this.article;
                this.commonServices.ArticleCompleteData.push(this.watching);
                localforage.setItem("ArticlePage", this.commonServices.ArticleCompleteData);

                console.log(this.commonServices.ArticleCompleteData);
                console.log("my Article data fathes");
                console.log(this.article);
                this.loading.dismiss();

            },
            error => console.log(error)
            )

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
        if (links.name == "Phone Call") {
            window.open('tel:' + ('+1' + this.commonServices.PhoneNo), '_system');
        }
        else if (links.linktypelink == "home") {
            this.navCtrl.push(HomePage, {});

        }
        else {
            console.log("page Change");
            this.navCtrl.push(str, {});
        }
    }
}


