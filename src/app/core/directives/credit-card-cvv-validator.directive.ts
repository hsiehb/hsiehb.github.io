import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[validateCVV]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => CVVValidator), multi: true}
    ]
})
export class CVVValidator implements Validator {
    constructor(@Attribute('validateCVV') public validateCVV: string) {
    }

    validate(c: AbstractControl): { [key: string]: any } {

        let AMEXCVV = new RegExp(decodeURIComponent(CONSTANTS.REGEX_NAMER.CVV.AMEX)),
            OTHERCVV = new RegExp(decodeURIComponent(CONSTANTS.REGEX_NAMER.CVV.OTHER)),
            AMEX_REGEX = new RegExp(decodeURIComponent(CONSTANTS.REGEX_NAMER.CREDIT_CARD.AMERICAN_EXPRESS)),
            err = {
                validateSecurityCode: true
            },
            creditCard = c.root.get(this.validateCVV);

        if (c.value === null || c.value === '') {
            return err;
        }

        if (AMEX_REGEX.test(creditCard.value))
            return AMEXCVV.test(c.value) ? null : err;
        else
            return OTHERCVV.test(c.value) ? null : err;
    }
}
