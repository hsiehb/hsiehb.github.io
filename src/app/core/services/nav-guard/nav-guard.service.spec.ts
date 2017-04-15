import { NavGuard } from './nav-guard.service';

describe('Service: NavGuard', () => {
    let service: NavGuard;

    beforeEach(() => { service = new NavGuard(); });

    describe('#addActivatedRoute', () => {

        it('adds activated routes', () => {
            service.addActivatedRoute('./select-products');

            expect(service.activatedRoutes).toContain('./select-products');
        });

        it('does not add route again if already activated', () => {
            service.activatedRoutes = ['./select-products'];
            service.addActivatedRoute('./select-products');

            expect(service.activatedRoutes).toEqual(['./select-products']);
        });
    });
});
