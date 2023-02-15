import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Selector, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';
import { JWTTokenService } from 'src/app/service/jwt-token.service';
import { LanguageService } from 'src/app/service/language.service';
import { UserService } from 'src/app/service/user.service';
import { AuthState, Login } from 'src/app/store/states/auth.state';
import { AuthModule } from '../auth.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    unsubscribe$: Subject<boolean> = new Subject<boolean>();
    valCheck: string[] = ['remember'];

    userName: string;
    password!: string;

    constructor(
        public layoutService: LayoutService,
        private store: Store,
        private router: Router,
        private authService: AuthService,
        private jwtService: JWTTokenService,
        private languageService: LanguageService,
        private userService: UserService
    ) {
        //when token is valid, redirect to dashboard
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/']);
        }
    }

    signIn() {
        this.authService
            .login({
                userName: this.userName,
                password: this.password,
            })
            .subscribe((loginResult) => {
                if (loginResult.token) {
                    // set app language for user
                    this.userService
                        .getUserByUserName(this.userName)
                        .subscribe((userResult) => {
                            const user = userResult.data;
                            console.log('### user', userResult);
                            if (userResult && userResult.data.appLanguage) {
                                this.languageService.changeLang(
                                    userResult.data.appLanguage
                                );
                            } else {
                                // When no language defined, set a default one.
                                this.languageService.setDefaultLanguage();
                            }
                        });
                    this.router.navigate(['/']);
                }
                console.log('#### login result after login', loginResult);
            });
    }
}
