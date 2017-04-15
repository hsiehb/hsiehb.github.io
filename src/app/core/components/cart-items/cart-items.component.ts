import { Input, Component, OnInit, SimpleChanges } from '@angular/core';
import { SessionStorageService } from 'ng2-webstorage';
import { FormsModule }  from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart/cart.service';

@Component({
    selector: 'cart-items',
    templateUrl: './cart-items.component.pug',
    styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent implements OnInit {
    @Input() cart: any;
    @Input() hasVat: boolean;
    cartItems: Array<any>;
    totals: any;

    constructor(
        private router: Router,
        private cartService: CartService,
        private storage: SessionStorageService
    ) {}

    ngOnChanges(changes) {
        this.cartItems = this.cart.lineItems || [];
        this.totals = this.cart.totals || {};
    }

    ngOnInit(): void {
    }

    setCart(cart: any): void {
        if (!cart || Object.keys(cart).length === 0) {
            this.storage.clear('cart');
            this.router.navigate([`./select-products`]);
        } else {
            this.cartItems = cart.lineItems || [];
            this.totals = cart.totals || {};
            this.storage.store('cart', cart);
        }
    }

    updateItem(item: any): void {
        if (isNaN(item.quantity) || item.quantity < 1) {
            return this.deleteItem(item.productId);
        } else if (item.quantity > 999) {
            item.quantity = 999;
        }

        this.cartService.updateQuantity(item.productId, item.quantity)
            .then((res: any) => {
                this.setCart(res);
            });
    }

    deleteItem(productId: string): void {
        this.cartService.deleteCartItem(productId, this.hasVat)
            .then((res: any) => {
                this.setCart(res);
            });
    }
}
