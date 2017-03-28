/**
 * Created by Bunny on 23-03-2017.
 */
import {Pipe, PipeTransform} from '@angular/core';
import { commonServices} from '../providers/common-services';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
@Pipe({
    name: 'getTrustUrl'
})


export class SafeHtmlUrl {

    constructor(protected _sanitizer: DomSanitizer) {

    }

    public transform(value: string) {
        console.log(value);
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);

    }

}