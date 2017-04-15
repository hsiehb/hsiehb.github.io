import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OfferingsApiService {
    private url = this.generateUrl();

    constructor (private http: Http) {}

    getOfferingsPromise(storeKey: string, productLine: string, country: string, language: string): Promise<any> {
        return this.http.get(this.url + 'store=' + storeKey + '&productline=' + productLine + '&country='
            + country + '&language=' + language)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private generateUrl(): string {
        return CONFIG.DOMAIN + '/services/' + CONFIG.API_VERSION + '/offerings?';
    }

    private extractData(res: Response): any {
        let body = res.json();
        return body || { };
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
