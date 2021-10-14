import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg != undefined){
      const countriesSelect = [];
      for (const countri of value) {
        if (countri.name.common.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          countriesSelect.push(countri);
        };
      };
      return countriesSelect;
    }else{
      return value;
    }
  }

}
