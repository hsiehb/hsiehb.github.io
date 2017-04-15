import { TestBed, inject } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('Service: NotificationService', () => {
    let notificationService: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NotificationService
            ]
        });
    });

    beforeEach(inject([NotificationService], (
        serviceInjection: NotificationService) => {

        notificationService = serviceInjection;
    }));

    it('should be defined', () => {
        expect(notificationService).toBeDefined();
    });

    it('should set up an error message emitter', () => {
        expect(notificationService.notifyErrorMessage).toBeDefined();
    });
});
