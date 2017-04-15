import { Directive, forwardRef, Attribute, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[validateCreditCard]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => CreditCardValidator), multi: true}
    ]
})
export class CreditCardValidator implements Validator {
    @Output() onValidate = new EventEmitter<string>();

    constructor() {
    }

    getCreditCardType(cardNumber: string): string {

        let CARD_REGEX = CONSTANTS.REGEX_NAMER.CREDIT_CARD,
            type;

        Object.keys(CARD_REGEX).forEach((card) => {
            let regex = new RegExp(decodeURIComponent(CARD_REGEX[card]));
            if (card !== 'ALL' && regex.test(cardNumber))
                type = card;
        });

        return type;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        let ALL_REGEX = new RegExp(decodeURIComponent(CONSTANTS.REGEX_NAMER.CREDIT_CARD.ALL)),
            JCB_REGEX = new RegExp(decodeURIComponent(CONSTANTS.REGEX_NAMER.CREDIT_CARD.JCB)),
            MAESTRO_REGEX = new RegExp(decodeURIComponent(CONSTANTS.REGEX_NAMER.CREDIT_CARD.MAESTRO)),
            err = {
                validateCreditCard: true
            },
            result;

        if (c.value === null || c.value === '') {
            return err;
        }

        result = ALL_REGEX.test(c.value) || JCB_REGEX.test(c.value) || MAESTRO_REGEX.test(c.value) ? null : err;

        if (result == null)
            this.onValidate.emit(this.getCreditCardType(c.value));

        return result;
    }
}
