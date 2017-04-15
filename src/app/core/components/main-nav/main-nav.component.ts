import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NavGuard } from '../../services/nav-guard/nav-guard.service';
import { SessionStorageService } from 'ng2-webstorage';

@Component({
    selector: 'main-nav',
    templateUrl: 'main-nav.component.pug',
    styleUrls: ['main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
    callerInfo: any;
    countries: any = CONSTANTS.COUNTRIES;
    orderFlow: Array<string> = [
        '/customer-information',
        '/select-products',
        '/customer-account',
        '/checkout',
        '/summary'
    ];
    menuItems: Array<any> = [
        {
            number: '1',
            route: '/customer-information',
            name: 'Customer Information'
        },
        {
            number: '2',
            route: '/select-products',
            name: 'Select Products'
        },
        {
            number: '3',
            route: '/customer-account',
            name: 'Customer Account'
        },
        {
            number: '4',
            route: '/checkout',
            name: 'Checkout'
        },
        {
            number: '5',
            route: '/summary',
            name: 'Summary'
        }
    ];

    constructor(
        private router: Router,
        private navGuard: NavGuard,
        private storage: SessionStorageService
    ) {
        this.storage.observe('callerInfo')
            .subscribe((newValue) => {
                this.callerInfo = newValue;
            });
    }

    ngOnInit(): void {
        this.callerInfo = this.storage.retrieve('callerInfo');
    }

    onClick(route: string): void {
        this.router.navigate([`.${route}`]);
    }

    isDisabled(route: string): boolean {
        let routeFrom = this.orderFlow.indexOf(this.router.url);
        let routeTo = this.orderFlow.indexOf(route);
        let flow = routeFrom - routeTo;
        let activatedRoute = this.navGuard.activatedRoutes.includes(route);

        if (activatedRoute) {
            return false;
        }

        if ((flow >= 0) && activatedRoute) {
            return false;
        }

        if (flow <= -1) {
            return true;
        }

        return true;
    }

    isCurrentPage(route: string): boolean {
        return this.router.url === route;
    }
}
