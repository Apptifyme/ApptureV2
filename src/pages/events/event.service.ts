/**
 * Created by Bunny on 16-03-2017.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class HttpServiceOfEvent {


    constructor(private http: Http) {
        console.log("Service Constructor Design Port Folio");

    }
    getEventData(pageno:number): Observable<any>{
        console.log("Service Method");
        return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAllEvent?pageno='+pageno+'&maxrow='+15)
            .map(res=>res.json());
    }
}
