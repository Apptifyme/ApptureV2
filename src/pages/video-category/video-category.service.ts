/**
 * Created by Bunny on 20-03-2017.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class HttpServiceOfVideoCategory {


    constructor(private http: Http) {
        console.log("Service Constructor");

    }
    getVideocategoryData(id:number): Observable<any>{
        console.log("Service Method");
        return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAllVideoGalleryVideo?id='+id+'&pageno=1&maxrow=15')
     //   return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAllVideoGalleryVideo?id='+pageno+'&pageno=1&maxrow=15')
            .map(res=>res.json());
    }
}