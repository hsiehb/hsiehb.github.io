import { Injectable } from '@angular/core';
import { OfferingsApiService } from './offerings.api.service';

@Injectable()
export class OfferingsService {
    constructor(private offeringsApiService: OfferingsApiService) {}

    getOfferings(storeKey: string, productLine: string, country: string, language: string): any {
        return this.contactOfferingsApi(storeKey, productLine, country, language)
            .then((res: any): any => {
                return res ? this.createOfferingsList(res.items) : {};
            })
            .catch((err: any): any => {
                return err;
            });
    }

    private contactOfferingsApi(storeKey: string, productLine: string, country: string,
                                language: string): Promise<any> {
        return this.offeringsApiService.getOfferingsPromise(storeKey, productLine, country, language);
    }

    private createOfferingsList(data: any): Array<any> {
        let terms: Array<any> = [];

        function addToTerms(subscriptions: Array<any>): void {
            subscriptions.forEach(function(plan) {
                if (plan.billingPlans) {
                    plan.billingPlans.forEach(function(item) {
                        let itemObj: any = {
                            name: item.billingPlanName,
                            priceId: item.price.priceId
                        };
                        terms.push(itemObj);
                    });
                }
            });
        }

        if (data.hasOwnProperty('BIC_SUBSCRIPTION')) {
            addToTerms(data['BIC_SUBSCRIPTION']);
        } else if (data.hasOwnProperty('META_SUBSCRIPTION')) {
            addToTerms(data['META_SUBSCRIPTION']);
        }

        return terms;
    }
}
