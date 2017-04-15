import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({name: 'searchFilter'})
@Injectable()
export class SearchFilterPipe implements PipeTransform {
    transform(list: Array<any>, args: string): any {
        let filteredList: Array<any> = [];

        if (!args) {
            return list;
        } else {
            args = args.toLowerCase();
        }

        list.forEach(function(item) {
            if (item.name.toLowerCase().indexOf(args) > -1) {
                filteredList.push(item);
            }
        });

        return filteredList;
    }
}
