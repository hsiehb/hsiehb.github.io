import { phoneNumberValidator } from './phone-number-validator.directive';
import { FormControl } from '@angular/forms';

describe('phoneNumberValidatorDirective', () => {

    it('should return error object if invalid number with letter', () => {
        const formControl = new FormControl('55555f51');

        expect(phoneNumberValidator('STORE-NAMER')(formControl)).toEqual({
            'validatePhoneNumber': { phoneNumber: '55555f51'}
        });
    });

    it('should return error object if invalid number with special characters', () => {
        const formControl = new FormControl('#$#*#');

        expect(phoneNumberValidator('STORE-NAMER')(formControl)).toEqual({
            'validatePhoneNumber': { phoneNumber: '#$#*#'}
        });
    });

    describe('STORE-NAMER', () => {

        it('should return null if valid number with phone characters', () => {
            const formControl1 = new FormControl('555-555 5555');
            const formControl2 = new FormControl('(555) 555-5555');

            expect(phoneNumberValidator('STORE-NAMER')(formControl1)).toEqual(null);
            expect(phoneNumberValidator('STORE-NAMER')(formControl2)).toEqual(null);
        });

        it('should return null if valid number w/o special characters', () => {
            const formControl = new FormControl('5555555555');

            expect(phoneNumberValidator('STORE-NAMER')(formControl)).toEqual(null);
        });

        it('should return error object if invalid number with special characters', () => {
            const formControl = new FormControl('555-555-55551');

            expect(phoneNumberValidator('STORE-NAMER')(formControl)).toEqual({
                'validatePhoneNumber': { phoneNumber: '555-555-55551'}
            });
        });

        it('should return error object if invalid number w/o special characters', () => {
            const formControl = new FormControl('55555555551');

            expect(phoneNumberValidator('STORE-NAMER')(formControl)).toEqual({
                'validatePhoneNumber': { phoneNumber: '55555555551'}
            });
        });

    });

    describe('STORE-EMEA', () => {

        it('should return null if valid number', () => {
            const formControlAtMaxLength = new FormControl('555555555555555');

            expect(phoneNumberValidator('STORE-EMEA')(formControlAtMaxLength)).toEqual(null);
        });

        it('should return error object if name with special characters', () => {
            const formControlOverMaxLength = new FormControl('5555555555555555');

            expect(phoneNumberValidator('STORE-EMEA')(formControlOverMaxLength)).toEqual({
                'validatePhoneNumber': { phoneNumber: '5555555555555555'}
            });
        });

    });

});
