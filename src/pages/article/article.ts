import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfActicle} from '../article/article.service'
import {HttpService} from '../home/home.service';
import { commonServices } from '../../providers/common-services';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ImageCategoryPage} from "../image-category/image-category";

@Component({
  selector: 'page-article',
  templateUrl: 'article.html'
})
export class ArticlePage {
   public id:number;
   public article={};
   public articlebaseurl="http://business.staging.appturemarket.com/uploads/";
  constructor(public navCtrl: NavController, public navParams: NavParams , private httpServiceOfArticle:HttpServiceOfActicle, private httpServiceOfHome: HttpService,private commonServices:commonServices) {
     this.id=this.navParams.get('id');
     this.getPageContent(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }
  getPageContent(id:number){
    this.httpServiceOfArticle.getArticleData(id)
        .subscribe(
            responce => {
              this.article = responce;
              console.log("my Article data fathes");
              console.log(this.article);

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
            this.navCtrl.push("HomePage",{});

        }
        else {
            console.log("page Change");
            this.navCtrl.push(str,{});
        }
    }
}


