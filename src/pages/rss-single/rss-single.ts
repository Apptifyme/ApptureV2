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
    i: any;
    title: any;
    j:number;
    @ViewChild(Slides) slides: Slides;
    fullTitle="";
    size:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public httpserviceofRss: HttpServiceOfRss, public commonServices: commonServices) {
        this.id = this.navParams.get('id');
        console.log(this.id);
        console.log("in cons");
        this.j = this.navParams.get('j');
        console.log(this.j);
        this.i = this.navParams.get('i');
        this.title = this.navParams.get('title');
        console.log(this.title);
        this.rssData = this.httpserviceofRss.RssContent;
        console.log(this.rssData);
        console.log(this.i);
        this.size=this.rssData[this.i].items.length;

        for(var i=0;i<this.rssData[this.i].items.length;i++)
        {

            this.fullTitle = this.rssData[this.i].items[i].title;
            if(this.fullTitle.indexOf('-') != -1){
                this.rssData[this.i].items[i].title = this.fullTitle.substring(0,this.fullTitle.indexOf('-')-1);
                this.rssData[this.i].items[i].subTitle = this.fullTitle.substring(this.fullTitle.indexOf('-')+1);
            }

        }

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad RssSinglePage');
        console.log(this.j);
        for(var i=0;i<this.j;i++) {
            console.log("data load");
            this.slides.slideNext();
        }
    }
    goRight(){
        var i=this.slides.getActiveIndex();
        if(i>this.rssData[this.i].length){
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