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
    responce : {};
    constructor(private http: Http){
        console.log("Service Constructor jn");

    }

    getPosts(): Observable<any>{
        console.log("Service Method");
        return this.http.get('http://business.staging.appturemarket.com/index.php/json/getAppConfig')
            .map(res => res.json());




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
}
