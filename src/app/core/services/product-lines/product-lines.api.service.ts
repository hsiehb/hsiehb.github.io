import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductLinesApiService {
    private url = this.generateUrl();

    constructor (private http: Http) {}

    getProductLinesPromise(storeKey: string, country: string): Promise<any> {
        return this.http.get(this.url + storeKey + '&country=' + country)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private generateUrl(): string {
        return CONFIG.DOMAIN + '/services/' + CONFIG.API_VERSION + '/productlines?storeExternalKey=';
    }

    private extractData(res: Response): any {
        let body = res.json();
        return body || { };
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
