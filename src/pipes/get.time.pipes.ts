/**
 * Created by Bunny on 22-03-2017.
 */
import {Pipe, PipeTransform} from '@angular/core';
import { commonServices} from '../providers/common-services';

@Pipe({
    name: 'getTime'
})

export class GetTime implements PipeTransform{

    constructor(
        private commonServices: commonServices
    ){}

    transform(image: string){


        if(image="00:00:00 00:00:00"){
            return null;
        }
        else{
            console.log("bhau bhai");
            return null;

        }

    }
}