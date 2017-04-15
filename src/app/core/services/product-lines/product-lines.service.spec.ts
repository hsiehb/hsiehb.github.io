import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ProductLinesService } from './product-lines.service';
import { ProductLinesApiService } from './product-lines.api.service';


describe('Service: ProductLinesService', () => {
    let service, productLinesApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductLinesService,
                ProductLinesApiService
            ],
            imports: [HttpModule]
        });
    });

    beforeEach(inject([ProductLinesService, ProductLinesApiService], (
            serviceInjection: ProductLinesService, productLinesApiServiceInjection: ProductLinesApiService) => {

        service = serviceInjection;
        productLinesApiService = productLinesApiServiceInjection;
    }));

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an empty array if no response', async(() => {
        spyOn(productLinesApiService, 'getProductLinesPromise').and.returnValue(Promise.resolve());
        service.getProductLines('STORE-NAMER', 'US')
            .then((res: any) => {
                expect(res).toEqual([]);
            });
    }));

    it('should return response data if it exists', async(() => {
        let mockResponse = { data: ['alpha', 'beta'] };
        spyOn(productLinesApiService, 'getProductLinesPromise').and.returnValue(Promise.resolve(mockResponse));
        service.getProductLines('STORE-EU', 'GR')
            .then((res: any) => {
                expect(res).toEqual(mockResponse.data);
            });
    }));

    it('should return error if productLinesApiService errors', async(() => {
        spyOn(productLinesApiService, 'getProductLinesPromise').and.returnValue(Promise.reject('error'));
        service.getProductLines('STORE-NAMER', 'US')
            .then((err: any) => {
                expect(err).toEqual('error');
            });
    }));
});
