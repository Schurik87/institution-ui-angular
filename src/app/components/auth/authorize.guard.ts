import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenService } from './../../service/jwt-token.service';
import { LocalStorageService } from './../../service/local-storage.sevice';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthorizeGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private authStorageService: LocalStorageService,
        private jwtService: JWTTokenService,
        private router: Router
    ) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.jwtService.getUserName()) {
            if (this.jwtService.isTokenExpired()) {
                // Should Redirect Sig-In Page
                this.router.navigate(['/auth/login']);
                return false;
            } else {
                return true;
            }
        } else {
            this.router.navigate(['/auth/login']);
            return false;
            // return new Promise((resolve) => {
            //     this.authService
            //         .login()
            //         .then(() => {
            //             resolve(true);
            //         })
            //         .catch(() => {
            //             // Should Redirect Sign-In Page
            //             this.router.navigate(['/auth/login']);
            //         });
            // });
        }
    }
}
