import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CartApiService {
    private url = this.generateUrl();

    constructor (
        private http: Http
    ) {}

    getCartPromise(estimateVat: boolean): Promise<any> {
        return this.http.get(this.url + this.getCartId() + `/?estimateVat=${estimateVat}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getCartItemCountPromise(): Promise<any> {
        return this.http.get(this.url + this.getCartId() + '/count')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    applyPromoCode(code: string, estimateVat: boolean): Promise<any> {
        let url = this.url + this.getCartId() + '/promotions',
            requestObject = { promotion: code, estimateVat: estimateVat },
            requestOptions = new RequestOptions({ withCredentials: true});

        return this.http.put(url, requestObject, requestOptions)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    removePromoCode(code: string, estimateVat: boolean): Promise<any> {
        let url = this.url + this.getCartId() + `/promotions/${code}`,
            requestObject = { body: { promotion: code, estimateVat: estimateVat } };

        return this.http.delete(url, requestObject)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteCartItemPromise(productId: string, estimateVat: boolean): Promise<any> {
        let requestObject = { body: { estimateVat: estimateVat } };
        return this.http.delete(this.url + this.getCartId() + `/items/${productId}`, requestObject)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getUpdateKeyPromise(storeKey: string): Promise<any> {
        let url = CONFIG.DOMAIN + `/services/${CONFIG.API_VERSION}/moe/updateKey`;
        return this.http.put(url, { storeId: storeKey })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    updateQuantityPromise(productId: string, quantity: number, estimateVat: boolean): Promise<any> {
        return this.http.put(this.url + this.getCartId() + `/items/${productId}`,
            {quantity: quantity, estimateVat: estimateVat})
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private getCartId(): string {
        let cartReference = Cookie.get(`cartReference${CONFIG.ENV_NAME}`) || '';
        let parsedCartReference = cartReference.split('|');
        return parsedCartReference ? parsedCartReference[0] + '|' + parsedCartReference[1] : '';
    }

    private generateUrl(): string {
        return CONFIG.DOMAIN + `/services/${CONFIG.API_VERSION}/cart/`;
    }

    private extractData(res: Response): any {
        let body = res.json();
        return body || { };
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
