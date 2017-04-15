import { Injectable } from '@angular/core';
import { ProductLinesApiService } from './product-lines.api.service';

@Injectable()
export class ProductLinesService {
    constructor(private productLinesApiService: ProductLinesApiService) {}

    getProductLines(storeKey: string, country: string): any {
        return this.contactProductLinesApi(storeKey, country)
            .then((res: any): any => {
                return res ? res.data : [];
            })
            .catch((err: any): any => {
                return err;
            });
    }

    private contactProductLinesApi(storeKey: string, country: string): Promise<any> {
        return this.productLinesApiService.getProductLinesPromise(storeKey, country);
    }
}
