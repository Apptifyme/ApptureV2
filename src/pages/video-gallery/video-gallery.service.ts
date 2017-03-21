/**
 * Created by Bunny on 16-03-2017.
 */
/**
 * Created by Bunny on 15-03-2017.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class HttpServiceOfVideoGallary {


    constructor(private http: Http) {
        console.log("Service Constructor Design Port Folio");

    }
    getVideocategoryData(pageno:number): Observable<any>{
        console.log("Service Method");
        return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAllVideoGallery?pageno='+1+'&maxrow='+15)
            .map(res=>res.json());
    }
}