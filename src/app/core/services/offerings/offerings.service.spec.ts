import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { OfferingsService } from './offerings.service';
import { OfferingsApiService } from './offerings.api.service';


describe('Service: OfferingsService', () => {
    let service, offeringsApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OfferingsService,
                OfferingsApiService
            ],
            imports: [HttpModule]
        });
    });

    beforeEach(inject([OfferingsService, OfferingsApiService], (
            serviceInjection: OfferingsService, offeringsApiServiceInjection: OfferingsApiService) => {

        service = serviceInjection;
        offeringsApiService = offeringsApiServiceInjection;
    }));

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an empty object if no response', async(() => {
        spyOn(offeringsApiService, 'getOfferingsPromise').and.returnValue(Promise.resolve());
        service.getOfferings('STORE-NAMER', 'MAYALT', 'US', 'en-us')
            .then((res: any) => {
                expect(res).toEqual({});
            });
    }));

    it('should create a list of offerings if response exists', async(() => {
        let mockResponse = {
                items: {
                    subscriptions: [{
                        billingPlans: [
                            { billingPlanName: 'alpha', price: { priceId: 1.11 }},
                            { billingPlanName: 'beta', price: { priceId: 2.22 }},
                            { billingPlanName: 'gamma', price: { priceId: 3.33 }}
                        ]}
                    ]
                }
            };
        spyOn(offeringsApiService, 'getOfferingsPromise').and.returnValue(Promise.resolve(mockResponse));
        service.getOfferings('STORE-NAMER', 'MAYALT', 'US', 'en-us')
            .then((res: any) => {
                res.forEach((item: any, index: number) => {
                    expect(item.name).toEqual(mockResponse.items.subscriptions[0].billingPlans[index].billingPlanName);
                });
            });
    }));

    it('should return error if offeringsApiService errors', async(() => {
        spyOn(offeringsApiService, 'getOfferingsPromise').and.returnValue(Promise.reject('error'));
        service.getOfferings('STORE-NAMER', 'MAYALT', 'US', 'en-us')
            .then((err: any) => {
                expect(err).toEqual('error');
            });
    }));
});
