import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoreApiService {
    private url = this.generateUrl();

    constructor (private http: Http) {}

    getStoresPromise(storeType: string): Promise<any> {
        return this.http.get(`${this.url}?storeType=${storeType}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getStorePromise(storeExtKey: string): Promise<any> {
        return this.http.get(`${this.url}/${storeExtKey}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private generateUrl(): string {
        return `${CONFIG.DOMAIN}/services/${CONFIG.API_VERSION}/store`;
    }

    private extractData(res: Response): any {
        let body = res.json();
        return body || { };
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
