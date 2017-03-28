/**
 * Created by Bunny on 16-03-2017.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { API } from '../../providers/api';
import {commonServices} from '../../providers/common-services';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
//import {ContactPage} from '../contact/contact';
import {VideoCategoryPage} from '../video-category/video-category'
import {VideoGalleryPage} from "../video-gallery/video-gallery.ts";
import {ImageCategoryPage} from "../image-category/image-category";
/*
 Generated class for the Conatct page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'contact-events',
    templateUrl: 'contact.html', styleUrls:['/contact.scss'],
})
export class ContactPage {
    data: any = {};
    tab: any = {};
    allvalidation: any = [];
    enquiry: any = {};

    constructor(public navCtrl: NavController, public api: API, public navParams: NavParams, private commonService: commonServices) {
        // console.log(this.commonService.appConfig);
        // this.data = this.commonService.appConfig[5];
        // console.log(this.data);
        this.getmap();
        // console.log(commonService.menuData);
        console.log(commonService.AllMenuData);
        this.data = this.commonService.AllMenuData.config[5];
        console.log(this.data.description);
        this.tab = 'Contact Us'
    }
    getmap() {


    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad EventsPage');
    }
    formvalidation = function (allvalidation) {
        var isvalid2 = true;
        for (var i = 0; i < allvalidation.length; i++) {
            if (allvalidation[i].field == "" || !allvalidation[i].field) {
                allvalidation[i].validation = "ng-dirty";
                isvalid2 = false;
            } else {
                allvalidation[i].validation = "";
            }
        }
        return isvalid2;
    }
    enquiryform = function (enquiry) {
        this.allvalidation = [{
            field: this.enquiry.name,
            validation: ""
        }, {
            field: this.enquiry.email,
            validation: ""
        }, {
            field: this.enquiry.title,
            validation: ""
        }, {
            field: this.enquiry.content,
            validation: ""
        }];
        console.log(this.allvalidation);
        var check = this.formvalidation(this.allvalidation);
        var data = {
            'name': this.enquiry.name,
            'email': this.enquiry.email,
            'title': this.enquiry.title,
            'content': this.enquiry.content
        }
        if (check) {
            this.api.createenquiry(data).subscribe((data) => {
                console.log(data);
            })
        } else {
            console.log('error');
        }

    }

    goToFooterInside(links:any){
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

            default:
                links.typeid = 0;

        }
        if (links.linktypelink == "setting") {
            window.open('tel:' + "9088788");
        }
        else if (links.linktypelink == "home") {
            this.navCtrl.push(HomePage,{});

        }
        else {
            console.log("page Change");
            this.navCtrl.push(str,{});
        }
    }

}
