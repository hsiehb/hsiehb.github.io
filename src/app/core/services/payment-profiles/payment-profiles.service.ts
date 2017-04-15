import { Injectable } from '@angular/core';
import { PaymentProfilesApiService } from './payment-profiles.api.service';

@Injectable()
export class PaymentProfilesService {
    constructor(private paymentProfilesApiService: PaymentProfilesApiService) {}

    getPaymentProfiles(userExtKey: string): Promise<any> {
        return this.paymentProfilesApiService.getProfiles(userExtKey);
    }

    addPaymentProfile(userExtKey: string, payload: any) {
        return this.paymentProfilesApiService.addPaymentProfile(userExtKey, payload);
    }
}
