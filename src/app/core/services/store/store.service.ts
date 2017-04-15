import { Injectable } from '@angular/core';
import { StoreApiService } from './store.api.service';

@Injectable()
export class StoreService {
    constructor(private storeApiService: StoreApiService) {}

    getStore(storeType: any): Promise<any> {
        return this.storeApiService.getStorePromise(storeType);
    }

    getStores(storeType: any): Promise<any> {
        return this.storeApiService.getStoresPromise(storeType);
    }

    getValidCountries(storeType: string): any {
        return this.getStores(storeType)
            .then(function(res: any): any {
                return this.createCountriesList(res);
            }.bind(this))
            .catch((err: any): any => {});
    }

    private hasVat(storeKey: string) {
        const emeaStores = CONSTANTS.VAT_COUNTRIES,
            storeName = storeKey.split('-')[1].toLowerCase();

        return emeaStores.indexOf(storeName) !== -1;
    }

    private createCountriesList(data: any): any {
        if (!Array.isArray(data)) return [];

        for (let country of data) {
            country.hasVat = this.hasVat(country.store);
        }
        return data.sort(this.sortCountries);
    }

    private sortCountries(a: any, b: any): number {
        if (CONSTANTS.COUNTRIES[a.countryCode] < CONSTANTS.COUNTRIES[b.countryCode]) {
            return -1;
        }
        if (CONSTANTS.COUNTRIES[a.countryCode] > CONSTANTS.COUNTRIES[b.countryCode]) {
            return 1;
        }
        return 0;
    }
}
