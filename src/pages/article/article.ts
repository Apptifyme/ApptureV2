import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpServiceOfActicle} from '../article/article.service'
import {HttpService} from '../home/home.service';
/*
  Generated class for the Article page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-article',
  templateUrl: 'article.html'
})
export class ArticlePage {
   public id:number;
   public article={};
   public articlebaseurl="http://business.staging.appturemarket.com/uploads/";
  constructor(public navCtrl: NavController, public navParams: NavParams , private httpServiceOfArticle:HttpServiceOfActicle, private httpServiceOfHome: HttpService) {
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

}
