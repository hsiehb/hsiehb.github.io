import { Input, Component, OnInit } from '@angular/core';

@Component({
    selector: 'product-icon',
    templateUrl: 'product-icon.component.pug',
    styleUrls: ['product-icon.component.scss'],
})

export class ProductIconComponent implements OnInit {

    @Input() url: string;

    defaultUrl: string = './assets/img/default_product.png';

    ngOnInit(): void {
        this.defaultUrl = this.url || './assets/img/default_product.png';
    }
}
