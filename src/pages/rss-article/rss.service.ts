/**
 * Created by Bunny on 17-03-2017.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class HttpServiceOfRss {

    RSS2JSON = 'http://rss2json.com/api.json?rss_url=';
    RssContent=[];

    constructor(private http: Http) {
        console.log("Service Constructor Rss data");

    }
    loadRssdata(pageno:string): Observable<any>{
        console.log("Service Method");
        return this.http.get('https://rss2json.com/api.json?rss_url='+pageno)
            .map(res=>res.json());
    }
}