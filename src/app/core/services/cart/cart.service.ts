import { Injectable } from '@angular/core';
import { CartApiService } from './cart.api.service';
import * as _ from 'lodash';

@Injectable()
export class CartService {
    constructor(private cartApiService: CartApiService) {}

    getCart(estimateVat: boolean = false): Promise<any> {
        return this.cartApiService.getCartPromise(estimateVat)
            .then((cart: any): any => {
                return this.updateSubtotals(cart, estimateVat);
            });
    }

    getCartItemCount(): Promise<any> {
        return this.cartApiService.getCartItemCountPromise();
    }

    applyPromoCode(code: string, estimateVat: boolean = false): Promise<any> {
        return this.cartApiService.applyPromoCode(code, estimateVat)
            .then((cart: any): any => {
                return this.updateSubtotals(cart, estimateVat);
            });
    }

    removePromoCode(code: string, estimateVat: boolean = false): Promise<any> {
        return this.cartApiService.removePromoCode(code, estimateVat)
            .then((cart: any): any => {
                return this.updateSubtotals(cart, estimateVat);
            });
    }

    updateKey(storeKey: string): Promise<any> {
        return this.cartApiService.getUpdateKeyPromise(storeKey);
    }

    deleteCartItem(productId: string, estimateVat: boolean = false) {
        return this.cartApiService.deleteCartItemPromise(productId, estimateVat)
            .then((cart: any): any => {
                return this.updateSubtotals(cart, estimateVat);
            });
    }

    updateQuantity(productId: string, quantity: number, estimateVat: boolean = false) {
        return this.cartApiService.updateQuantityPromise(productId, quantity, estimateVat)
            .then((cart: any): any => {
                return this.updateSubtotals(cart, estimateVat);
            });
    }

    updateSubtotals(cart: any,  hasVat: boolean): any {
        _.each(cart.lineItems, (product: any): void => {
            product.productSubTotal = this.productSubTotal(product, hasVat);
            product.productSubTotalWithoutPromo = this.productSubTotalWithoutPromo(product, hasVat);
        });
        return cart;
    }

    hasPromoDiscount(product: any): boolean {
        return parseFloat(product.promoDiscount) > 0;
    }

    productSubTotal(product: any, hasVat: boolean): any {
        if (hasVat) {
            return product.subtotalAfterPromotionsWithTax;
        }
        return this.hasPromoDiscount(product) ? product.subtotalAfterPromo : product.calculatedPrice;
    }

    productSubTotalWithoutPromo(product: any, hasVat: boolean): any {
        return hasVat ? product.subtotalWithTax : product.calculatedPrice;
    }
}
