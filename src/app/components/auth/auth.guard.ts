import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
} from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { JWTTokenService } from 'src/app/service/jwt-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private jwtService: JWTTokenService,
        private authService: AuthService
    ) {}
    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}
