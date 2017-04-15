import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { UserApiService } from './user.api.service';

describe('Service: UserInviteService', () => {
    let service, userInviteApiService,
      mockPayload = {
        userInvite : {
          firstName   : 'firstname',
          country     : 'us',
          language    : 'en',
          emailId     : 'testemail@ssttest.net',
          invitedBy   : 'F5XBPHF37Q8R'
        }
      };

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            UserService,
            UserApiService
          ],
          imports: [HttpModule]
        });
    });

    beforeEach(inject([UserService, UserApiService], (
        serviceInjection: UserService, userInviteApiServiceInjection: UserApiService) => {

        service = serviceInjection;
        userInviteApiService = userInviteApiServiceInjection;
    }));

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should make user invite api call', () => {
        let mockResponse = {
            json: () => {
                return {
                    emailReferenceId: '85556fdd-157b-4cda-82f0-ffae268a2202'
                };
            }
        };

        spyOn(userInviteApiService, 'postUserInvite').and.returnValue(Promise.resolve(mockResponse));
        service.postUserInvite(mockPayload);
        expect(userInviteApiService.postUserInvite).toHaveBeenCalled();
    });

    it('should make lookup call', () => {
        let mockResponse = {
            'UserVerifiedResult': {
                'EmailVerified': true,
                'EmailExist': true,
                'UserID': 'XZT9MRL85HC6'
            }
        };
    });



});

