import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
    selector: 'message-box',
    templateUrl: './message-box.component.pug',
    styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {

    private showMessageBox: boolean = false;
    private messageTitle: string;
    private messageBody: string;
    private messageType: string;
    private route: string;

    constructor(private router: Router, private notificationService: NotificationService) {}

    ngOnInit(): void {
        this.notificationService.getNotifications().subscribe((notification: any) => {
            if (notification.body['0']) {
                if (notification.body['1']) {
                    notification.body = notification.body['0'] + ' ' + notification.body['1'];
                } else {
                    notification.body = notification.body['0'];
                }
            }

            this.showMessageBox = true;
            this.messageTitle = notification.title;
            this.messageBody = notification.body;
            this.messageType = notification.type;
            this.route = notification.route;
        });
    }

    isSuccess(): boolean {
       return this.messageType === 'success';
    }

    onClose(): void {
        this.showMessageBox = false;
        this.router.navigate([this.route]);
    }
}
