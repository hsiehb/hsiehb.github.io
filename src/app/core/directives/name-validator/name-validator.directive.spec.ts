import { nameValidator } from './name-validator.directive';
import { FormControl } from '@angular/forms';

describe('nameValidatorDirective', () => {

    it('should return null if valid name', () => {
        const formControl = new FormControl('John Smith');

        expect(nameValidator()(formControl)).toEqual(null);
    });

    it('should return error object if name with special characters', () => {
        const formControl = new FormControl('J@hn Sm!th');

        expect(nameValidator()(formControl)).toEqual({ 'validateName': { name: 'J@hn Sm!th'} });
    });

    it('should return error object if name with numbers', () => {
        const formControl = new FormControl('j0hn Sm1th');

        expect(nameValidator()(formControl)).toEqual({ 'validateName': { name: 'j0hn Sm1th'} });
    });

});
