import { Component }   from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder,
    Validators
} from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { CCDateValidator } from './credit-card-date-validator.directive';

@Component({
    template: `
        <form [formGroup]="complexForm">
            <input [formControl]="complexForm.controls['cardExpMonth']" validateCCDate="month" type="number" 
             year="cardExpYear"/>
            
            <input [formControl]="complexForm.controls['cardExpYear']" validateCCDate="year" type="number" 
             month="cardExpMonth" />
        </form>
    `
})

class TestComponent {
    complexForm: FormGroup;
}

describe('CCDateValidator', () => {

    let fixture: ComponentFixture<TestComponent>,
        comp, debug, monthInput, yearInput, form, monthControl, yearControl;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [CCDateValidator, TestComponent]
        })
        .createComponent(TestComponent);

        comp = fixture.componentInstance;
        debug = fixture.debugElement;
        form = comp.complexForm = new FormGroup({'cardExpMonth': new FormControl(), 'cardExpYear': new FormControl()});
        monthInput = debug.queryAll(By.directive(CCDateValidator))[0];
        yearInput = debug.queryAll(By.directive(CCDateValidator))[1];
        monthControl = form.controls['cardExpMonth'];
        yearControl = form.controls['cardExpYear'];

        fixture.detectChanges();
    });

    it('should be valid when only month is entered', () => {

        monthInput.nativeElement.value = 1;
        dispatchEvent(monthInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(monthControl.hasError('validateCCDate')).toBe(false);
        expect(form.valid).toEqual(true);

    });

    it('should be valid when only year is entered', () => {

        yearInput.nativeElement.value = 2016;
        dispatchEvent(yearInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(yearControl.hasError('validateCCDate')).toBe(false);
        expect(form.valid).toEqual(true);

    });

    it('should be valid when both year and month has valid values', () => {
        let now = new Date();
        yearInput.nativeElement.value = now.getFullYear();
        monthInput.nativeElement.value = now.getMonth() + 1;
        dispatchEvent(yearInput.nativeElement, 'input');
        dispatchEvent(monthInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(yearControl.hasError('validateCCDate')).toBe(false);
        expect(form.valid).toEqual(true);

    });

    it('should be invalid when user selects a date in the past  ', () => {
        let now = new Date();
        yearInput.nativeElement.value = now.getFullYear() - 1;
        monthInput.nativeElement.value = now.getMonth() + 1;
        dispatchEvent(yearInput.nativeElement, 'input');
        dispatchEvent(monthInput.nativeElement, 'input');
        fixture.detectChanges();

        expect(yearControl.hasError('validateCCDate')).toBe(true);
        expect(form.valid).toEqual(false);

    });

});
