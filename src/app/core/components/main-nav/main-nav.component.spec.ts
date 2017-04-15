import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AppModule } from '../../../app.module';
import { NavGuard }   from '../../services/nav-guard/nav-guard.service';
import { MainNavComponent } from './main-nav.component';

describe('MainNavComponent', () => {

    let comp: MainNavComponent;
    let fixture: ComponentFixture<MainNavComponent>;
    let navGuard: NavGuard;

    class RouterStub {
        navigate(route: string) { return route; }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule ],
            providers:    [
                NavGuard,
                { provide: Router, useClass: RouterStub }],
        });

        fixture = TestBed.createComponent(MainNavComponent);
        comp    = fixture.componentInstance;

        // navGuard actually injected into the component
        navGuard = fixture.debugElement.injector.get(NavGuard);
    });

    it('should be initialized', () => {
        comp.ngOnInit();
        expect(comp).toBeDefined();
    });

    describe('onClick', () => {
        it('should navigate to correct route', inject([Router], (router: Router) => {
            let route = '/select-products';

            spyOn(router, 'navigate');
            comp.onClick(route);

            expect(router.navigate).toHaveBeenCalledWith([`.${route}`]);
        }));
    });

    describe('isDisabled', () => {
        let route1: string = '/select-products';
        let route2: string = '/customer-account';

        beforeEach(() => {
            comp.orderFlow = [ '/select-products', '/customer-account'];
        });

        it('should return false if next route is activated', inject([Router], (router: Router) => {
            router.url = route1;
            navGuard.activatedRoutes = [route2];

            expect(comp.isDisabled(route2)).toBe(false);
        }));

        it('should return false if from route2 to route1 (is activated route)', inject([Router], (router: Router) => {
            router.url = route2;
            navGuard.activatedRoutes = [route1];

            expect(comp.isDisabled(route1)).toBe(false);
        }));

        it('should return true if from route2 to route1 (not activated route)', inject([Router], (router: Router) => {
            router.url = route2;
            navGuard.activatedRoutes = [];

            expect(comp.isDisabled(route1)).toBe(true);
        }));

        it('should return true if next route is not activated', inject([Router], (router: Router) => {
            router.url = route1;

            expect(comp.isDisabled(route2)).toBe(true);
        }));

    });

    describe('isCurrentPage', () => {
        it('should return false if not on current page', inject([Router], (router: Router) => {
            let route = '/select-products';
            router.url = '/not-select-products';

            expect(comp.isCurrentPage(route)).toBe(false);
        }));

        it('should return true if on current page', inject([Router], (router: Router) => {
            let route = '/select-products';
            router.url = '/select-products';

            expect(comp.isCurrentPage(route)).toBe(true);
        }));
    });

});
