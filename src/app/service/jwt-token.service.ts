import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JWTTokenService {
    jwtToken: string;
    decodedToken: { [key: string]: string };

    constructor() {}

    setToken(token: string) {
        if (token) {
            this.jwtToken = token;
        }
    }

    decodeToken() {
        if (this.jwtToken) {
            this.decodedToken = jwt_decode(this.jwtToken);
        }
    }

    getDecodeToken() {
        return jwt_decode(this.jwtToken);
    }

    getUserName() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['userName'] : null;
    }

    getExpiryTime(): number | null {
        this.decodeToken();
        return this.decodedToken ? Number(this.decodedToken['exp']) : null;
    }

    isTokenExpired(): boolean {
        const expiryTime: number = this.getExpiryTime() || 0;
        if (expiryTime) {
            return 1000 * Number(expiryTime) - new Date().getTime() < 5000;
        } else {
            return false;
        }
    }
}
