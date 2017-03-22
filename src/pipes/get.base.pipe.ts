/**
 * Created by Bunny on 22-03-2017.
 */
import {Pipe, PipeTransform} from '@angular/core';
import { commonServices} from '../providers/common-services';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
@Pipe({
    name: 'getBase'
})


export class SafeBase {

    constructor(protected _sanitizer: DomSanitizer) {

    }

    public transform(value: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {

        return this._sanitizer.bypassSecurityTrustHtml(value);

    }

}