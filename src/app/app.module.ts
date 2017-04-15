import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Core Modules
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './core/components/components.module';
import { PipesModule } from './core/pipes/pipes.module';

// Page Modules
import { CustomerInformationModule } from './customer-information/customer-information.module';
import { SelectProductsModule } from './select-products/select-products.module';
import { CustomerAccountModule } from './customer-account/customer-account.module';
import { CheckoutModule } from './checkout/checkout.module';
import { SummaryModule } from './summary/summary.module';
import { ErrorModule } from './error/error.module';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
/*
 * Bootstrap Module
 */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HttpModule, Http } from '@angular/http';
import { HttpInterceptor } from './core/services/interceptor/interceptor.service';
import { NotificationService } from './core/services/notification/notification.service';


// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        CustomerInformationModule,
        ErrorModule,
        ComponentsModule,
        PipesModule
    ],
    providers: [
        // expose our Services and Providers into Angular's dependency injection, enable custom HttpInterceptor service
        {
            provide: Http,
            useClass: HttpInterceptor
        },
        NotificationService,
        ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})

export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {}

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        // console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues  = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
