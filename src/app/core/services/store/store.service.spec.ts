import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { StoreService } from './store.service';
import { StoreApiService } from './store.api.service';


describe('Service: StoreService', () => {
    let service, storeApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StoreService,
                StoreApiService
            ],
            imports: [HttpModule]
        });
    });

    beforeEach(inject([StoreService, StoreApiService], (
            serviceInjection: StoreService, storeApiServiceInjection: StoreApiService) => {

        service = serviceInjection;
        storeApiService = storeApiServiceInjection;
    }));

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should make storeApi call', () => {
        let mockResponse = [
                { countryCode: 'CA', store: 'STORE-CA' },
                { countryCode: 'US', store: 'STORE-NAMER' },
                { countryCode: 'GB', store: 'STORE-UK' },
                { countryCode: 'IT', store: 'STORE-IT' },
                { countryCode: 'ZZ', store: 'STORE-ZZ' },
                { countryCode: 'AT', store: 'STORE-EU' },
                { countryCode: 'DE', store: 'STORE-DE' },
                { countryCode: 'AT', store: 'STORE-EU' }
            ];
        spyOn(storeApiService, 'getStoresPromise').and.returnValue(Promise.resolve(mockResponse));
        service.getValidCountries('STORE');
        expect(storeApiService.getStoresPromise).toHaveBeenCalled();
    });

    it('should not create countries list if storeApiService returns error', () => {
        spyOn(storeApiService, 'getStoresPromise').and.returnValue(Promise.reject(Error));
        spyOn(service, 'createCountriesList');
        service.getValidCountries('FORGE');
        expect(service.createCountriesList).not.toHaveBeenCalled();
    });

    it('should initialize hasVat flag for EU countries', async(() => {
        let mockResponse = [
            { countryCode: 'US', store: 'STORE-NAMER' },
            { countryCode: 'GB', store: 'STORE-UK' }];

        spyOn(storeApiService, 'getStoresPromise').and.returnValue(Promise.resolve(mockResponse));
        service.getValidCountries('STORE')
            .then((res: any) => {
                expect(res[0].hasVat).toEqual(true);
                expect(res[1].hasVat).toEqual(false);
            });
    }));

});
