import { Injectable }     from '@angular/core';
import { UserApiService } from './user.api.service';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {

    constructor(private userInviteApiService: UserApiService, private http: Http) {}

    postUserInvite(body: any): Promise<any> {
        return this.userInviteApiService.postUserInvite(body)
            .then(this.extractData)
            .catch(this.handleError);
    }

    lookup(user: string): any {
        return this.userInviteApiService.lookupUser(user)
            .catch(this.handleError);
    }

    private extractData(res: Response): any {
        let body = res.json();
        return body || { };
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
