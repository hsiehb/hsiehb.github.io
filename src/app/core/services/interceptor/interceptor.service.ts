import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, RequestOptions, XHRBackend, Headers } from '@angular/http';
// TODO: set up 404 pages and routing (note: we are expecting a 404 status code on an oxygen verify email call)
// import {RouterModule, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../notification/notification.service';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';

@Injectable()
export class HttpInterceptor extends Http {
    constructor(backend: XHRBackend, defaultOptions: RequestOptions, private notificationService: NotificationService) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        // TODO: start spinner
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, options));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options === null || options === undefined) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        options = new RequestOptions({
            headers: headers,
            withCredentials: true
        });
    }

        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        // TODO: end spinner

        return observable.map((response: Response) => {
            let body = response.json();
            if (this.hasErrorStatus(response.status) || this.hasError(body)) {
                return this.errorHandler(body, response);
            }
            return response;
        })
        .catch((err: any) => {
            // TODO: display server error?
            return Observable.throw(err || 'Server Error');
        });
    }

    private errorHandler(rejectionBody: any, rejection: any): any {
        // Check if it's a 500 being thrown on update cart key,
        // if so, don't throw a server side error
        if (rejection.status === 500 && rejection.config.url.indexOf('updateKey') > -1) {
            console.log('500 and updateKey err');
            // TODO:
            return rejection;
        }

        // Check if it's a 504 being thrown on vat id validation,
        // if so, don't throw a server side error
        if ((rejection.status === 504 || rejection.status === 0) && rejection.config.url.indexOf('vat') > -1) {
            console.log('504 or 0 and vat err');
            // TODO:
            return rejection;
        }

        // Check if user is not authorized and needs to sign in again,
        // otherwise broadcast the error
        if (rejection && (rejection.status === 401 || rejection.status === 419)) {
            console.log('unauthorized');
            return rejection;
            // TODO: sign out user?
        }

        // check for different response body types
        let error = this.hasError(rejectionBody);

        let errObject = this.createErrorObject(error);

        // custom error
        if (!errObject.code) {
          return rejection;
        }

        // VAT errors, promo error, duplicate payment profile
        if (CONSTANTS.ERROR_CODES_TO_IGNORE.indexOf(errObject.code) > -1) {
            return rejection;
        }

        // TODO: display error modal if able + return rejection
        let errMessage = this.generateErrorMessage(errObject);

        if (errMessage) {
            this.notificationService.notifyErrorMessage.next(errMessage);
            return rejection;
        }

        // unhandled errors
        return rejection;
    }

    private hasError(responseBody: any): boolean {
        // check for different response body types
        let responseDataErrorResult = _.get(responseBody, 'data.error', null);

        let responseErrorResult = _.get(responseBody, 'error', null);

        let responseErrorsResult = _.get(responseBody, 'errors[0]', null);

        return responseErrorResult || responseDataErrorResult  || responseErrorsResult;
    }

    private hasErrorStatus(statusCode: number): any {
        return statusCode < 200 || statusCode > 299;
    }

    private createErrorObject(error: any): any {
        let errObj: any = {};
        if (error && error.code && error.message) {
            errObj.code = error.code;
            errObj.message = error.message;
            return errObj;
        }

        if (error && error.previousErrors && error.previousErrors.length) {
            errObj.code = error.previousErrors[0].code;
            errObj.message = error.previousErrors[0].message;
        }
        return errObj;
    }

    private generateErrorMessage(error: any): any {
        let errorCode = error ? error.code : null,
            errorId: any = CONSTANTS.ERRORS.SERVER_ERRORS[errorCode],
            errorTitle: string = errorId ? errorId['TITLE'] : null,
            errorBody: Array<string> = errorId ? errorId['BODY'] : null,
            compiledErrorMessage: any = { };
        if (errorId) {
            compiledErrorMessage.title = errorTitle;
            compiledErrorMessage.body = errorBody;
        } else {
            return null;
        }

        return compiledErrorMessage;
    }
}
