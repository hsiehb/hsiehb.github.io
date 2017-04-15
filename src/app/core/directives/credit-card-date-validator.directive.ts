import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[validateCCDate]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => CCDateValidator), multi: true}
    ]
})
export class CCDateValidator implements Validator {

    constructor(@Attribute('validateCCDate') public type: string,
                @Attribute('month') public monthFCName: string,
                @Attribute('year') public yearFCName: string) {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        let err = {
                validateCCDate: true
            },
            month = this.type === 'year' ? c.root.get(this.monthFCName) : c,
            year = this.type === 'month' ? c.root.get(this.yearFCName) : c,
            other = this.type === 'year' ? month : year,
            now = new Date(),
            selectedDate = new Date(year.value, month.value - 1, 1),
            nowDate = new Date(now.getFullYear(), now.getMonth());

        if (month.value === null || month.value === '' || year.value === null || year.value === '') {
            return null;
        }

        let result = selectedDate.getTime() >= nowDate.getTime() ? null : err;

        // set error on the other
        if (result === null && other.errors !== null) {
            delete other.errors['validateCCDate'];
            if (!Object.keys(other.errors).length)
                other.setErrors(null);
        } else if (result != null)
            other.setErrors(err);

        c.markAsTouched();
        return result;
    }
}
