import { Component, DebugElement }   from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder,
    Validators
} from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { CreditCardValidator } from './credit-card-validator.directive';

@Component({
    template: `
        <form [formGroup]="complexForm">
            <input [formControl]="complexForm.controls['card']" validateCreditCard type="number"  name="card" />
        </form>
    `
})

class TestComponent {
    cvv: number;
    card: number;
    complexForm: FormGroup;
}

describe('CreditCardValidator', () => {

    let fixture: ComponentFixture<TestComponent>,
        comp, debug, cvvInput, cardInput, form, control;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [CreditCardValidator, TestComponent]
        })
        .createComponent(TestComponent);

        comp = fixture.componentInstance;
        debug = fixture.debugElement;
        form = comp.complexForm = new FormGroup({'card': new FormControl()});
        cardInput = debug.queryAll(By.directive(CreditCardValidator))[0];
        control = form.controls['card'];

        fixture.detectChanges();
    });

    it('should be valid when value is a valid VISA card', () => {

        cardInput.nativeElement.value = 4111111111111111;
        dispatchEvent(cardInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(control.hasError('validateCreditCard')).toBe(false);
        expect(form.valid).toEqual(true);

    });

    it('should be invalid when input is wrong', () => {

        cardInput.nativeElement.value = 411111111;
        dispatchEvent(cardInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(control.hasError('validateCreditCard')).toBe(true);
        expect(form.valid).toEqual(false);

    });

    it('should be invalid when input is null', () => {

        // cardInput.nativeElement.value = null;
        dispatchEvent(cardInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(control.hasError('validateCreditCard')).toBe(true);
        expect(form.valid).toEqual(false);

    });

    it('should be valid when value is a valid AMEX card', () => {

        cardInput.nativeElement.value = 378282246310005;
        dispatchEvent(cardInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(control.hasError('validateCreditCard')).toBe(false);
        expect(form.valid).toEqual(true);

    });

    it('should be valid when value is a valid JCB card', () => {

        cardInput.nativeElement.value = 378282246310005;
        dispatchEvent(cardInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(control.hasError('validateCreditCard')).toBe(false);
        expect(form.valid).toEqual(true);

    });

    it('should be valid when value is a valid Discover card', () => {

        cardInput.nativeElement.value = 6011111111111117;
        dispatchEvent(cardInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(control.hasError('validateCreditCard')).toBe(false);
        expect(form.valid).toEqual(true);

    });
});
