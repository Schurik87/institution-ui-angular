import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Actions, ofActionDispatched, Select } from '@ngxs/store';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { LanguageService } from './service/language.service';
import { AuthState, Logout } from './store/states/auth.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    // @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;
    // isAuthenticated: boolean = false;
    constructor(
        private primengConfig: PrimeNGConfig,
        private actions: Actions,
        private router: Router,
        private languageService: LanguageService
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.languageService.setDefaultLanguage();
        // when user logs out, automatically redirect the user to login.
        // this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
        //     console.log('### logout detected');
        //     this.router.navigate(['/auth/login']);
        // });
        // check if user authentication state changed
        // this.isAuthenticated$.subscribe((authenticaded) => {
        //     console.log('##### authentidation state changed', authenticaded);
        //     this.isAuthenticated = authenticaded || false;
        // });
        // we expect from all routes that the user needs to be logged in
        // this.router.events.subscribe((event) => {
        //     if (event instanceof NavigationStart && !this.isAuthenticated) {
        //         this.router.navigate(['http://localhost:4200/#/auth/login']);
        //     }
        // });
    }
}
