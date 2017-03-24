 /**
 * Created by Bunny on 09-03-2017.
 */
/**
 * Created by Bunny on 09-03-2017.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
@Injectable()
export class HttpService{
    response : {};
    menudata=[];
    RssArrayData=[];
    RssArray=[];
    appConfig=[];
    constructor(private http: Http){
        console.log("Service Constructor jn");

    }
    footerArray={};
    getPosts(): Observable<any>{
        console.log("Service Method");
        return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAppConfig')
            .map(res => res.json());




    }
    isURL(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
   }

    getSlider(): Observable<any>{
        console.log("Get slider");
        return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAllSliders')
            .map(res=>res.json());
    }

    getPromotions(): Observable<any>{
        console.log("Get promotion");
        return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAllPromotions')
            .map(res=>res.json());
    }

    getAllFooterMenu(): Observable<any>{
        console.log("Get All Footer Menu ==  >");
        return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAllFootermenu')
            .map(res=>res.json());
    }

    getAllFrontMenu(): Observable<any>{
        console.log("Get ALl Front Menu");
        return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAllFrontMenu')
            .map(res=>res.json());
    }

    getSingleArticle(a:number):Observable<any>{
              console.log("getting Single Article");
              return this.http.get('http://business.staging.appturemarket.com/index.php/json/getSingleArticles?id='+a)
                  .map(res=>res.json());
         }
}
