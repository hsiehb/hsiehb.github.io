import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng2Webstorage } from 'ng2-webstorage';
import { CustomerInformationComponent } from './customer-information.component';
import { StoreApiService } from '../core/services/store/store.api.service';
import { StoreService } from '../core/services/store/store.service';
import { CartApiService } from '../core/services/cart/cart.api.service';
import { CartService } from '../core/services/cart/cart.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberValidatorDirective } from
    '../core/directives/phone-number-validator/phone-number-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2Webstorage
    ],
    declarations: [
        CustomerInformationComponent,
        PhoneNumberValidatorDirective],
    providers: [
        StoreApiService,
        StoreService,
        CartApiService,
        CartService,
        Cookie
    ],
    exports: [
        CustomerInformationComponent,
        PhoneNumberValidatorDirective
    ]
})
export class CustomerInformationModule { }
