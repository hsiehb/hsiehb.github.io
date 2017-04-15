import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import * as _ from 'lodash';

@Component({
    selector: 'error-message-modal',
    templateUrl: 'error-message-modal.component.pug',
    styleUrls: ['./error-message-modal.component.scss']
})

export class ErrorMessageModalComponent implements OnInit {


    private showServerError: boolean = false;
    private serverErrorTitle: string;
    private serverErrorBody: string;

    constructor(private notificationService: NotificationService) {}


    ngOnInit(): void {
        this.notificationService.getErrorNotifications().subscribe((notification: any) => {

            this.showServerError = true;
            this.serverErrorTitle = notification.title;
            this.serverErrorBody = _.join(notification.body, '');
        });
    }

}
