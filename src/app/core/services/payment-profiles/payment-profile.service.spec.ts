import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PaymentProfilesService } from './payment-profiles.service';
import { PaymentProfilesApiService } from './payment-profiles.api.service';


describe('Service: PaymentProfileService', () => {
    let paymentProfilesService: PaymentProfilesService;
    let paymentProfilesApiService: PaymentProfilesApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PaymentProfilesService,
                PaymentProfilesApiService
            ],
            imports: [HttpModule]
        });
    });

    beforeEach(inject([PaymentProfilesService, PaymentProfilesApiService], (
        serviceInjection: PaymentProfilesService,
        paymentApiServiceInjection: PaymentProfilesApiService) => {

            paymentProfilesService = serviceInjection;
            paymentProfilesApiService = paymentApiServiceInjection;
    }));

    it('should be defined', () => {
        expect(paymentProfilesService).toBeDefined();
    });

    it('should get payment profiles', () => {
        let mockResponse = {
            paymentProfiles: []
        };
        spyOn(paymentProfilesApiService, 'getProfiles').and.returnValue(Promise.resolve(mockResponse));
        paymentProfilesService.getPaymentProfiles('EXB33444X');
        expect(paymentProfilesApiService.getProfiles).toHaveBeenCalled();
    });

    it('should add payment profiles', () => {
        let mockResponse = {
            paymentProfiles: []
        }, payload = {
            billingInfo: {
                'firstName': 'Mohit'
            },
            paymentInfo : {
                encryptedCreditCard : 'qwerq3opunyt14y23crnqelkjwSINODUQWGERXHWIZDKJWHANFD'
            }
        };

        spyOn(paymentProfilesApiService, 'addPaymentProfile').and.returnValue(Promise.resolve(mockResponse));
        paymentProfilesService.addPaymentProfile('EXB33444X', payload);
        expect(paymentProfilesApiService.addPaymentProfile).toHaveBeenCalled();
    });
});
