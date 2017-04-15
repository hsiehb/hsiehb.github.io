import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PaymentProfilesApiService {
    private url = this.generateUrl();

    constructor (
        private http: Http
    ) {}

    getProfiles(userExtKey: string): Promise<any> {
        return this.http.get(this.url + `?userExtKey=${userExtKey}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addPaymentProfile(userExtKey: string, payload: any): Promise<any> {
      return this.http.post(this.url +  `?userExtKey=${userExtKey}`, { user: payload })
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    private generateUrl(): string {
        return CONFIG.DOMAIN + `/services/${CONFIG.API_VERSION}/paymentprofiles/`;
    }

    private extractData(res: Response): any {
        let body = res.json();
        return body || { };
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
