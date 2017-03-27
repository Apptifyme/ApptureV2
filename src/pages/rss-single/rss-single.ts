import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams,Slides } from 'ionic-angular';
import {HttpServiceOfRss} from '../rss-article/rss.service';
import {commonServices} from '../../providers/common-services'

/*
  Generated class for the RssSingle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rss-single',
  templateUrl: 'rss-single.html',styleUrls:['/rss-single.scss'],
})
export class RssSinglePage {
    id: any;
    rssData = [];
    parentIndex: any;
    title: any;
    childIndex:number;
    @ViewChild(Slides) slides: Slides;
    fullTitle="";
    // size:any;
    watching={id:0,data:{}};
    constructor(public navCtrl: NavController, public navParams: NavParams, 
    public httpserviceofRss: HttpServiceOfRss, public commonServices: commonServices) {
        this.id = this.navParams.get('id');
        console.log("in cons");
        this.childIndex = this.navParams.get('childIndex');
        console.log(this.childIndex);
        this.parentIndex = this.navParams.get('parentIndex');
                console.log(this.parentIndex);

        this.title = this.navParams.get('title');
        console.log(this.title);
        console.log(this.commonServices.RssArticle);
        this.rssData = this.commonServices.RssArticle[this.parentIndex].items.items;
        console.log(this.rssData);
        console.log(this.parentIndex);
        // this.size=this.rssData.items.length;

        for(var i=0;i<this.rssData.length;i++)
        {
            this.fullTitle = this.rssData[i].title;
            if(this.fullTitle.indexOf('-') != -1){
                this.rssData[i].title = this.fullTitle.substring(0,this.fullTitle.indexOf('-')-1);
                this.rssData[i].subTitle = this.fullTitle.substring(this.fullTitle.indexOf('-')+1);
            }

        }

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad RssSinglePage');
        console.log(this.childIndex);
        for(var i=0;i<this.childIndex;i++) {
            console.log("data load");
            this.slides.slideNext();
        }
        this.slides.getActiveIndex();
        this.slides.length()
    }
    goRight(){
        var i=this.slides.getActiveIndex();
        if(i>this.rssData[this.parentIndex].length){
            console.log("last slide");

        }
        else{
            console.log("slide Right");
            this.slides.slideNext();
        }
    }
    goLeft(){
             var i=this.slides.getActiveIndex();
             if(i<=0){
                 console.log("last slide");
              }
             else{
                 console.log("slide Left")
             this.slides.slidePrev();
              }
       }

}