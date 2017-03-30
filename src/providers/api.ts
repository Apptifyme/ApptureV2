import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { commonServices } from '../providers/common-services';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the API provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class API {


  constructor(private http: Http, public commonServices: commonServices) {
    console.log('Hello API Provider');
  }

  getHeaderLogo(): Observable<any> {
    return this.http.get(this.commonServices.adminUrl + 'getAppConfig')
      .map(res => res.json());
  }
  getImageCategories() {
    return this.http.get(this.commonServices.adminUrl + 'getAllGallery');
  }
  getGalleryImages(id) {
    return this.http.get(this.commonServices.adminUrl + 'getAllGalleryImage?id=' + id);
  }
  getAllFrontMenu(): Observable<any> {
    return this.http.get(this.commonServices.adminUrl + 'getAllFrontmenu')
      .map(res => res.json());
  }

  getallsliders(): Observable<any> {
    return this.http.get(this.commonServices.adminUrl + 'getAllSliders')
      .map(res => res.json())
      .catch(this.handleError);

  }

  getAllPromotions(): Observable<any> {
    return this.http.get(this.commonServices.adminUrl + 'getAllPromotions')
      .map(res => res.json())
      .catch(this.handleError);

  }

  getSingleArticle(id: number): Observable<any> {
    return this.http.get(this.commonServices.adminUrl + 'getSingleArticles?id=' + id)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAllFootermenu(): Observable<any> {
    return this.http.get(this.commonServices.adminUrl + 'getAllFootermenu')
      .map(res => res.json())
      .catch(this.handleError);
  }

  sendEnquiry(Data): Observable<any> {
    
    return this.http.post(this.commonServices.adminUrl + 'createEnquiry',Data)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

}


