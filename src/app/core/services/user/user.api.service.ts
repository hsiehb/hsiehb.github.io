import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserApiService {
    private url: string = CONFIG.DOMAIN + '/services/' + CONFIG.API_VERSION;
    private lookupUrl: string = this.generateLookupUrl();
    private inviteUrl: string = this.generateInviteUrl();

    constructor (private http: Http) {}

    postUserInvite(body: any): Promise<any> {
        return this.http.post(this.inviteUrl, body)
            .toPromise();
    }

    lookupUser(user: string): any {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let userParam = this.validateEmail(user) ? encodeURIComponent(user) + '?lookupBy=email' : user;

        return this.http.get(this.lookupUrl + userParam, options)
            .timeout(9000)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private generateInviteUrl(): string {
        return this.url + '/user/invite';
    }

    private generateLookupUrl(): string {
        return this.url + '/user/oxygen/';
    }

    private validateEmail(user: string): boolean {
        /* tslint:disable */
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        /* tslint:enable */
        return re.test(user);
    }

    private extractData(res: Response | any) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;

        if (error.status === 404) {
            return Observable.throw(error);
        }

        if (error.status === 400) {
            return Observable.throw(error);
        }

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message || error.toString();
        }

        return Observable.throw(errMsg);
    }
}
