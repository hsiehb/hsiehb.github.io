import { inject, async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavGuard } from '../../services/nav-guard/nav-guard.service';

import { ComponentsModule } from '../../components/components.module';
import { UserService } from '../../services/user/user.service';
import { SessionStorageService } from 'ng2-webstorage';
import { MessageBoxComponent } from './message-box.component';
import { AppModule } from '../../../app.module';
import { NotificationService } from '../../services/notification/notification.service';


describe('MessageBoxComponent', () => {
    let component, fixture, navGuard, userInviteService, storage, notificationService, router;

    class MockRouter {
        navigate(route: string) { return route; }
    }

    class MockActivatedRoute {
        public queryParams: any = {
            subscribe(params: any) {}
        };
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, ComponentsModule],
            declarations: [],
            providers: [
                NavGuard,
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
                { provide: Router, useClass: MockRouter },
                UserService,
                NotificationService
            ],
        });

        fixture = TestBed.createComponent(MessageBoxComponent);
        component = fixture.componentInstance;
    });

    beforeEach(inject([UserService, SessionStorageService, NotificationService, Router],
        (userInviteServiceInjection: UserService, sessionStorageServiceInjection: SessionStorageService,
         notificationServiceInjection: NotificationService, routerInjection: Router) => {
            userInviteService = userInviteServiceInjection;
            storage = sessionStorageServiceInjection;
            notificationService = notificationServiceInjection;
            router = routerInjection;
        }));

    it('should be defined', () => {
        expect(component).toBeDefined();
    });

    it('should set values from message object on initialization', () => {
        let mockNotification = {
            title : 'title',
            body  : ['body'],
            type   : 'type',
            route  : 'route',
        };

        spyOn(notificationService, 'getNotifications').and.callThrough();

        component.ngOnInit();
        notificationService.notifyMessage.next(mockNotification);

        expect(component.showMessageBox).toEqual(true);
        expect(component.messageTitle).toEqual(mockNotification.title);
        expect(component.messageBody).toEqual(mockNotification.body);
        expect(component.messageType).toEqual(mockNotification.type);
        expect(component.route).toEqual(mockNotification.route);
        expect(notificationService.getNotifications).toHaveBeenCalledWith();
    });

    describe('isSuccess()' , () => {

        it('should return true if message type is success', () => {
            component.messageType = 'success';
            expect(component.isSuccess()).toBe(true);
        });

    });

    describe('generateMessageObj()', () => {

        it('should close message box and navigate to specified route', () => {
            component.route = 'checkout';
            spyOn(router, 'navigate');

           component.onClose();

           expect(component.showMessageBox).toBe(false);
           expect(router.navigate).toHaveBeenCalledWith([component.route]);
        });

    });
});
