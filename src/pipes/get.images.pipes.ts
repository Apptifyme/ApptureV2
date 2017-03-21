import {Pipe, PipeTransform} from '@angular/core';
import { commonServices} from '../providers/common-services';

@Pipe({
    name: 'getImage'
})

export class GetImage implements PipeTransform{

    constructor(
        private commonServices: commonServices
    ){}

    transform(image: string){

            var arr=[];
            arr=image.split(',',6);
            console.log("In Filter");
            return arr.shift();

    }
}