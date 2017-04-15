import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(object): any {
        let keys = [];
        Object.keys(object).forEach((key) => {
            keys.push({key: key, value: object[key]});
        });
        return keys;
    }
}
