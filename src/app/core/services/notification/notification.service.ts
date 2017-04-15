import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';

@Injectable()
export class NotificationService {
    notifyErrorMessage: Subject<any> = new Subject();
    notifyMessage: Subject<any> = new Subject();

    constructor() {}

    getErrorNotifications(): Observable<any> {
        return this.notifyErrorMessage.asObservable();
    }

    getNotifications(): Observable<any> {
        return this.notifyMessage.asObservable();
    }

}
