/**
 * Created by Bunny on 19-03-2017.
 */

import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class HttpServiceOfSocial {

    RSS2JSON = 'http://rss2json.com/api.json?rss_url=';

    constructor(private http: Http) {
        console.log("Service Constructor Rss data");

    }
    getSocialData(): Observable<any>{
        console.log("Service Method");
        return this.http.get('')
            .map(res=>res.json());
    }
}