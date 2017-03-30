import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { HttpServiceOfRss } from '../rss-article/rss.service';
import { commonServices } from '../../providers/common-services'

/*
  Generated class for the RssSingle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-rss-single',
    templateUrl: 'rss-single.html', styleUrls: ['/rss-single.scss'],
})
export class RssSinglePage {
    id: any;
    rssData = [];
    parentIndex: any;
    title: any;
    childIndex: number;
    @ViewChild(Slides) slides: Slides;
    fullTitle = "";
    // size:any;
    watching = { id: 0, data: {} };
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public httpserviceofRss: HttpServiceOfRss, public commonServices: commonServices) {
        this.id = this.navParams.get('id');
        this.childIndex = this.navParams.get('childIndex');
        this.parentIndex = this.navParams.get('parentIndex');

        this.title = this.navParams.get('title');
        this.rssData = this.commonServices.RssArticle[this.parentIndex].items.items;
        for (let j = 0; j < this.rssData.length; j++) {
            this.rssData[j].content = this.processArticle(this.rssData[j].content, this.rssData[j].imageLink)
        }
        setTimeout(() => {
            this.slides.slideTo(this.childIndex, 0);
        }, 500);
        // this.size=this.rssData.items.length;

        for (var i = 0; i < this.rssData.length; i++) {
            this.fullTitle = this.rssData[i].title;
            this.fullTitle = this.fullTitle.replace(/\u2013|\u2014/g, "-");
            if (this.fullTitle.indexOf('-') != -1) {
                this.rssData[i].title = this.fullTitle.substring(0, this.fullTitle.indexOf('-') - 1);
                this.rssData[i].subTitle = this.fullTitle.substring(this.fullTitle.indexOf('-') + 1);
            }

        }

    }

    processArticle(content, image) {

        let loopRemoveDuplicateImage = true;

        // console.log($scope.article);
        function removeDuplicateImage() {
            let htmlString = content;
            let string1 = htmlString.substring(htmlString.indexOf('src="'), htmlString.indexOf('"', htmlString.indexOf('src="') + 5));
            let imageString = string1.substring(5, string1.length);
            if (imageString == image) {
                var nextImage = htmlString.substring(htmlString.indexOf('<img'), htmlString.indexOf('>', htmlString.indexOf('<img') + 5) + 1);
                content = content.replace(nextImage, '');
            }
            else {
                loopRemoveDuplicateImage = false;
            }
        }

        while (loopRemoveDuplicateImage) {
            removeDuplicateImage();
        }

        return content;
    }

    ionViewDidLoad() {
        for (var i = 0; i < this.childIndex; i++) {
            this.slides.slideNext();
        }
        this.slides.getActiveIndex();
        // this.slides.length()
    }
    goRight() {
        var i = this.slides.getActiveIndex();
        if (i > this.rssData[this.parentIndex].length) {
        }
        else {
            this.slides.slideNext();
        }
    }
    goLeft() {
        var i = this.slides.getActiveIndex();
        if (i <= 0) {
        }
        else {
            this.slides.slidePrev();
        }
    }
    slideChanged() {
        this.childIndex = this.slides.getActiveIndex();
    }

}