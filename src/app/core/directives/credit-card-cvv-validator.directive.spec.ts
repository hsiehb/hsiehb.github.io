import { Component, DebugElement }   from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CVVValidator } from './credit-card-cvv-validator.directive';
import { By } from '@angular/platform-browser';
import {
    FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder,
    Validators
} from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';

@Component({
    template: `
        <form [formGroup]="complexForm">
            <input [formControl]="complexForm.controls['cvv']" validateCVV="card" type="number" name="cvv"/>
            <input [formControl]="complexForm.controls['card']" type="number"  name="card" />
        </form>
    `
})

class TestComponent {
    cvv: number;
    card: number;
    complexForm: FormGroup;
}

describe('CVVValidator', () => {

    let fixture: ComponentFixture<TestComponent>,
        comp, debug, cvvInput, cardInput, form, cvvControl;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [CVVValidator, TestComponent]
        })
        .createComponent(TestComponent);

        comp = fixture.componentInstance;
        debug = fixture.debugElement;
        form = comp.complexForm = new FormGroup({'cvv': new FormControl(), 'card': new FormControl()});
        cvvInput = debug.queryAll(By.directive(CVVValidator))[0];
        cardInput = debug.queryAll(By.css('input[name=card]'))[0];
        cvvControl = form.controls['cvv'];

        fixture.detectChanges();
    });

    it('should be valid when  value is 3 digits', () => {

        cvvInput.nativeElement.value = 111;
        dispatchEvent(cvvInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(cvvControl.hasError('validateSecurityCode')).toBe(false);
        expect(form.valid).toEqual(true);

    });

    it('should be invalid when cvv is 4 digits', () => {
        cvvInput.nativeElement.value = 1111;
        dispatchEvent(cvvInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(cvvControl.hasError('validateSecurityCode')).toBe(true);
        expect(form.valid).toEqual(false);

    });

    it('should be invalid when cvv is 4 digits with VISA Card', () => {

        cvvInput.nativeElement.value = 1111;
        cardInput.nativeElement.value = 4111111111111111; // VISA
        dispatchEvent(cvvInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(cvvControl.hasError('validateSecurityCode')).toBe(true);
        expect(form.valid).toEqual(false);
    });

    it('should be invalid when cvv is 4 digits with AMEX Card', () => {

        cvvInput.nativeElement.value = 1111;
        cardInput.nativeElement.value = 371449635398431; // VISA
        dispatchEvent(cvvInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(cvvControl.hasError('validateSecurityCode')).toBe(true);
        expect(form.valid).toEqual(false);
    });
});
