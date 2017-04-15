import { Directive, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const name = control.value;
        const nameRe = {
            numbers: new RegExp(CONSTANTS.REGEX_NAMER.NUMBERS, 'i'),
            invalid: new RegExp(CONSTANTS.REGEX_NAMER.INVALID)
        };

        if (!name) { return null; }

        return name.match(nameRe.numbers) || name.match(nameRe.invalid) || name.length > 35 ?
            { 'validateName': {name} } : null;
    };
}

// ONLY NEEDED IF VALIDATOR NEEDS TO BE USED IN PUG (ex. validateName=name)

@Directive({
    selector: '[validateName]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: NameValidatorDirective, multi: true}
    ]
})
export class NameValidatorDirective implements Validator, OnChanges {
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        this.valFn = nameValidator();
    }

    validate(control: AbstractControl): { [key: string]: any} {
        return this.valFn(control);
    }
}
