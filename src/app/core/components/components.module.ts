import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2Webstorage } from 'ng2-webstorage';
import { FormsModule }  from '@angular/forms';

import { AppRoutingModule } from '../../app-routing.module';
import { NavGuard } from '../services/nav-guard/nav-guard.service';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { ProductIconComponent } from './product-icon/product-icon.component';
import { ErrorMessageModalComponent } from './error-message-modal/error-message-modal.component';
import { MessageBoxComponent } from './message-box/message-box.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        Ng2Webstorage,
        FormsModule
    ],
    exports: [
        MainNavComponent,
        ErrorMessageModalComponent,
        MessageBoxComponent,
        CartItemsComponent,
        ProductIconComponent
    ],
    declarations: [
        MainNavComponent,
        ErrorMessageModalComponent,
        MessageBoxComponent,
        CartItemsComponent,
        ProductIconComponent
    ],
    providers: [ NavGuard ]
})
export class ComponentsModule { }
