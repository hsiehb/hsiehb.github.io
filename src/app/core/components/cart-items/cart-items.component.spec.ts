import { inject, async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AppModule } from '../../../app.module';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ng2-webstorage';
import { CartItemsComponent } from './cart-items.component';
import { CartService } from '../../services/cart/cart.service';

describe('CartItemsComponent', () => {
    let comp: CartItemsComponent,
        fixture: ComponentFixture<CartItemsComponent>,
        cartService,
        router;

    class RouterStub {
        navigate(route: string) { return route; }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule ],
            providers: [
                { provide: Router, useClass: RouterStub },
                CartService
            ]
        });
        fixture = TestBed.createComponent(CartItemsComponent);
        comp = fixture.componentInstance;
    });

    beforeEach(inject([CartService, Router], (cartServiceInjection: CartService, routerInjection: Router) => {
        cartService = cartServiceInjection;
        router = routerInjection;
    }));

    it('should be initialized', () => {
        comp.ngOnInit();
        expect(comp).toBeDefined();
    });

    describe('setCart method', () => {
        it('should set cart items and totals', () => {
            let mockCart = {
                lineItems: [ { id: '123' }, { id: '456' } ],
                totals: { price: '789.00' }
            };
            comp.setCart(mockCart);
            expect(comp.cartItems).toEqual(mockCart.lineItems);
            expect(comp.totals).toEqual(mockCart.totals);
        });

        it('should navigate to select-products page', () => {
            spyOn(router, 'navigate');
            comp.setCart(null);
            expect(router.navigate).toHaveBeenCalledWith(['./select-products']);
        });
    });

    describe('updateItem method', () => {
        beforeEach(() => {
            spyOn(cartService, 'updateQuantity').and.returnValue(Promise.resolve(''));
            spyOn(comp, 'deleteItem').and.returnValue(Promise.resolve());
        });

        it('should call updateQuantity method from cartService', async(() => {
            comp.updateItem({ quantity: 2 });
            fixture.whenStable().then(() => {
                expect(cartService.updateQuantity).toHaveBeenCalled();
            });
        }));

        it('should call deleteItem method', async(() => {
            comp.updateItem({ quantity: 0 });
            fixture.whenStable().then(() => {
                expect(comp.deleteItem).toHaveBeenCalled();
            });
        }));

        it('should set the quantity to 999', async(() => {
            let mockItem = { quantity: 1000 };
            comp.updateItem(mockItem);
            fixture.whenStable().then(() => {
                expect(mockItem.quantity).toEqual(999);
            });
        }));
    });

    describe('deleteItem method', () => {
        it('should call deleteCartItem method from cartService', fakeAsync(() => {
            spyOn(cartService, 'deleteCartItem').and.returnValue(Promise.resolve(''));
            comp.deleteItem('123');
            tick();
            expect(cartService.deleteCartItem).toHaveBeenCalled();
        }));

        it('should call setCart method', fakeAsync(() => {
            spyOn(cartService, 'deleteCartItem').and.returnValue(Promise.resolve({ price: ''}));
            spyOn(comp, 'setCart');
            comp.deleteItem('123');
            tick();
            expect(comp.setCart).toHaveBeenCalled();
        }));
    });
});
