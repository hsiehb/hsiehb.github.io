import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';

@Injectable()
export class NavGuard implements CanActivate {
    activatedRoutes: any = [];
    canActivate() {
        return true;
    }

    addActivatedRoute(route): void {
        if (!this.activatedRoutes.includes(route)) {
            this.activatedRoutes.push(route);
        }
    }
}
