import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { CartService } from './cart.service';
import { CartApiService } from './cart.api.service';


describe('Service: CartService', () => {
    let cartService: CartService;
    let cartApiService: CartApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CartService,
                CartApiService
            ],
            imports: [HttpModule]
        });
    });

    beforeEach(inject([CartService, CartApiService], (
        cartServiceInjection: CartService,
        cartApiServiceInjection: CartApiService) => {

        cartService = cartServiceInjection;
        cartApiService = cartApiServiceInjection;
    }));

    it('should be defined', () => {
        expect(cartService).toBeDefined();
    });

    it('should get cart item count', () => {
        let mockResponse = {
            count: 0
        };
        spyOn(cartApiService, 'getCartItemCountPromise').and.returnValue(Promise.resolve(mockResponse));
        cartService.getCartItemCount();
        expect(cartApiService.getCartItemCountPromise).toHaveBeenCalled();
    });

    describe('line item syb totals ', () => {
        describe('for EMEA ', () => {
            it('should show sub total with VAT with or without promo applied', () => {
                let product = {
                    subtotalAfterPromotionsWithTax: 'subtotalAfterPromotionsWithTax'
                },
                    hasVat = true;
                expect(cartService.productSubTotal(product, hasVat)).toEqual('subtotalAfterPromotionsWithTax');
            });

            it('should show line through sub total with VAT without promo when promo applied', () => {
                let product = {
                    subtotalWithTax: 'subtotalWithTax'
                },
                    hasVat = true;
                expect(cartService.productSubTotalWithoutPromo(product, hasVat)).toEqual('subtotalWithTax');
            });

        });

        describe('for NAMER ', () => {

            it('should show sub total without tax and promo applied', () => {
                let product = {
                    subtotalAfterPromo: 'subtotalAfterPromo',
                    promoDiscount: '1.0'
                },
                    hasVat = false;
                expect(cartService.productSubTotal(product, hasVat)).toEqual('subtotalAfterPromo');
            });

            it('should show sub total without tax without promo applied', () => {
                let product = {
                    calculatedPrice: 'calculatedPrice',
                    promoDiscount: '0'
                },
                    hasVat = false;
                expect(cartService.productSubTotal(product, hasVat)).toEqual('calculatedPrice');
            });

            it('should show line through sub total without tax and without promo when promo applied', () => {
                let product = {
                    calculatedPrice: 'calculatedPrice'
                },
                    hasVat = false;
                expect(cartService.productSubTotalWithoutPromo(product, hasVat)).toEqual('calculatedPrice');
            });

        });

        describe('getCart method', () => {
            it('should call updateSubtotals method', fakeAsync(() => {
                spyOn(cartService, 'updateSubtotals');
                spyOn(cartApiService, 'getCartPromise').and.returnValue(Promise.resolve(''));
                cartService.getCart(false);
                tick();
                expect(cartService.updateSubtotals).toHaveBeenCalled();
            }));
        });

        describe('updateKey method', () => {
            it('should call getUpdateKeyPromise method from cartApiService', () => {
                spyOn(cartApiService, 'getUpdateKeyPromise').and.callThrough();
                cartService.updateKey('STORE-EU');
                expect(cartApiService.getUpdateKeyPromise).toHaveBeenCalled();
            });
        });

        describe('deleteCartItem method', () => {
            it('should call deleteCartItemPromise method from cartApiService', () => {
                spyOn(cartApiService, 'deleteCartItemPromise').and.callThrough();
                cartService.deleteCartItem('MAYA-LT', false);
                expect(cartApiService.deleteCartItemPromise).toHaveBeenCalled();
            });
        });

        describe('updateQuantity method', () => {
            it('should call updateQuantityPromise method from cartApiService', () => {
                spyOn(cartApiService, 'updateQuantityPromise').and.callThrough();
                cartService.updateQuantity('ACAD', 3, false);
                expect(cartApiService.updateQuantityPromise).toHaveBeenCalled();
            });
        });

        describe('updateSubtotals', () => {
            it('should...', () => {
                let mockCart = {
                    lineItems: [
                        {
                            subtotalAfterPromotionsWithTax: 123.00,
                            subtotalAfterPromo: 456.00,
                            calculatedPrice: 789.00
                        },
                        {
                            subtotalAfterPromotionsWithTax: 111.00,
                            subtotalAfterPromo: 222.00,
                            calculatedPrice: 333.00
                        }
                    ]
                };
                cartService.updateSubtotals(mockCart, false);
                expect(true).toBe(true);
            });
        });

        describe('applyPromoCode method', () => {
            it('should call updateSubtotals method', fakeAsync(() => {
                spyOn(cartService, 'updateSubtotals');
                spyOn(cartApiService, 'applyPromoCode').and.returnValue(Promise.resolve(''));
                cartService.applyPromoCode('alpha', false);
                tick();
                expect(cartService.updateSubtotals).toHaveBeenCalled();
            }));
        });

        describe('removePromoCode method', () => {
            it('should call updateSubtotals method', fakeAsync(() => {
                spyOn(cartService, 'updateSubtotals');
                spyOn(cartApiService, 'removePromoCode').and.returnValue(Promise.resolve(''));
                cartService.removePromoCode('alpha', false);
                tick();
                expect(cartService.updateSubtotals).toHaveBeenCalled();
            }));
        });
    });
});
