import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { User, UserLogin } from '../api/user';
import { ServiceError } from './service.error.handling';
import config from '../../config/config.json';
import moment from 'moment';
import { JWTTokenService } from './jwt-token.service';
import { Router } from '@angular/router';

interface loginResult {
    expiresIn: string;
    token: string;
}

@Injectable()
export class AuthService {
    apiUrl = config['apiURL'];
    constructor(
        private http: HttpClient,
        private jwtTokenService: JWTTokenService,
        private router: Router
    ) {}

    login(userLogin: UserLogin) {
        return this.http
            .post<loginResult>(`${this.apiUrl}/users/login`, userLogin)
            .pipe(tap((result) => this.setSession(result.token)));
    }

    private setSession(token: string) {
        this.jwtTokenService.setToken(token);
        localStorage.setItem('id_token', token);
        localStorage.setItem(
            'expires_at',
            this.jwtTokenService.getExpiryTime()?.toString() || '0'
        );
    }

    logout() {
        this.jwtTokenService = new JWTTokenService();
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.router.navigate(['/auth/login']);
    }

    public isLoggedIn() {
        // check if session is still present
        if (
            !this.jwtTokenService.jwtToken &&
            localStorage.getItem('id_token')
        ) {
            this.jwtTokenService.setToken(
                localStorage.getItem('id_token') || ''
            );
            console.log('#### refresh jwt token service session');
        }
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiresAt = this.jwtTokenService.getExpiryTime() || 0;
        return moment.unix(expiresAt);
    }
}
