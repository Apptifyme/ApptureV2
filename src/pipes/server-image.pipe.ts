import {Pipe, PipeTransform} from '@angular/core';
import { commonServices} from '../providers/common-services';

@Pipe({
    name: 'serverImage'
})

export class ServerImage implements PipeTransform{

    constructor(
        private commonServices: commonServices
    ){}

    transform(image: string): string{
        if (image && image != null) {
                var start = image.substr(0, 4);
                if (start == "http") {
                    return image;
                }  
                return this.commonServices.adminImage + image;
            } else {
                return undefined;
            }
    }
}