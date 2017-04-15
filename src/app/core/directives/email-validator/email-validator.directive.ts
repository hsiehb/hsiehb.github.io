import { Directive, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const email = control.value;
        const emailRe = new RegExp(CONSTANTS.REGEX_NAMER.EMAIL);

        if (!email) { return null; }

        return !email.match(emailRe) || email.length > 76 ? { 'validateEmail': {email} } : null;
    };
}

// ONLY NEEDED IF VALIDATOR NEEDS TO BE USED IN PUG (ex. validateEmail=email)

@Directive({
    selector: '[validateEmail]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}
    ]
})
export class EmailValidatorDirective implements Validator, OnChanges {
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        this.valFn = emailValidator();
    }

    validate(control: AbstractControl): { [key: string]: any} {
        return this.valFn(control);
    }
}
