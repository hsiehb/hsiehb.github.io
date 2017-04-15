import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function phoneNumberValidator(storeExternalKey: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const phoneNumber = control.value;
        const phoneRe = storeExternalKey === 'STORE-NAMER' ? {
            phoneSymbols: new RegExp(CONSTANTS.REGEX_NAMER.PHONE_SYMBOLS),
            letters: new RegExp(CONSTANTS.REGEX_NAMER.LETTERS, 'i'),
            invalidWithoutPhoneSymbols: new RegExp(CONSTANTS.REGEX_NAMER.INVALID_WITHOUT_PHONE_SYMBOLS)
        } : {
            phoneSymbols: new RegExp(CONSTANTS.REGEX_EMEA.PHONE_SYMBOLS),
            letters: new RegExp(CONSTANTS.REGEX_EMEA.LETTERS, 'i'),
            invalidWithoutPhoneSymbols: new RegExp(CONSTANTS.REGEX_EMEA.INVALID_WITHOUT_PHONE_SYMBOLS)
        };
        let maxLength;

        if (!storeExternalKey || !control.value) {
            return null;
        }

        if (storeExternalKey === 'STORE-NAMER') {
            if (phoneNumber.match(phoneRe.phoneSymbols)) {
                if (phoneNumber.match(/^[+]/)) {
                    maxLength = 15;
                } else if (phoneNumber.match(/^[\(]/)) {
                    maxLength = 14;
                } else if (phoneNumber.match(/[-. ]/)) {
                    maxLength = 12;
                }
            } else {
                maxLength = 10;
            }
        } else {
            maxLength = 15;
        }

        if (phoneNumber.length <= maxLength) {
            return (phoneNumber.match(phoneRe.letters) ||
                    phoneNumber.match(phoneRe.invalidWithoutPhoneSymbols)) ?
                    { 'validatePhoneNumber': {phoneNumber} } : null;
        } else {
            return {'validatePhoneNumber': {phoneNumber}};
        }
    };
}

// ONLY NEEDED IF TEMPLATE-DRIVEN, SO CAN USE IN PUG (ex. validatePhoneNumber=number)

@Directive({
    selector: '[validatePhoneNumber]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: PhoneNumberValidatorDirective, multi: true}
    ]
})
export class PhoneNumberValidatorDirective implements Validator, OnChanges {
    @Input() storeExternalKey: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
            this.valFn = phoneNumberValidator(this.storeExternalKey);
    }

    validate(control: AbstractControl): { [key: string]: any} {
        return this.valFn(control);
    }
}
