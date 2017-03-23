/**
 * Created by Bunny on 22-03-2017.
 */
import {Pipe, PipeTransform} from '@angular/core';
import { commonServices} from '../providers/common-services';
import { DatePipe } from '@angular/common';


@Pipe({
    name: 'getTime'
})

export class GetTime implements PipeTransform{
   val:any;
    constructor(
        private commonServices: commonServices,private datePipe: DatePipe
    ){}

    transform(date: string){

        //  console.log(date);
       //   console.log("In Pipe");
        if(date=="0000-00-00 00:00:00"){
         //   console.log("return null");
            return "null";
        }
        else{
           //  console.log("return date");
           this.val=this.datePipe.transform(date, 'yyyy-MMMM-dd');
            return this.val;
        }

    }
}