import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { SelectProductsComponent } from './select-products/select-products.component';
import { SummaryComponent } from './summary/summary.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { ErrorComponent } from './error/error.component';
import { TermsComponent } from './summary/terms/terms.component';
import { NavGuard } from './core/services/nav-guard/nav-guard.service';

export const appRoutes: Routes = [
    { path: '',      component: CustomerInformationComponent },
    { path: '**',    component: ErrorComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
