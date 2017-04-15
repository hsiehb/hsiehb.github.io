import { emailValidator } from './email-validator.directive';
import { FormControl } from '@angular/forms';

describe('emailValidatorDirective', () => {

    it('should return null if valid email', () => {
        const formControl = new FormControl('test@abc.com');

        expect(emailValidator()(formControl)).toEqual(null);
    });

    it('should return error object if invalid email', () => {
        const formControl = new FormControl('test@.com');

        expect(emailValidator()(formControl)).toEqual({ 'validateEmail': { email: 'test@.com'} });
    });

    it('should return error object if email', () => {
        const formControl = new FormControl('test@.com');

        expect(emailValidator()(formControl)).toEqual({ 'validateEmail': { email: 'test@.com'} });
    });

});
