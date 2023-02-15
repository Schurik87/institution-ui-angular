import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from '../api/user';
import { AuthService } from '../service/auth.service';
import { GetCurrentUser, GetUsers } from '../store/actions/user.action';
import { Logout } from '../store/states/auth.state';
import { UserState } from '../store/states/user.state';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    @Select(UserState.getCurrentUser) currentUser$?: Observable<User>;

    constructor(
        public layoutService: LayoutService,
        private store: Store,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        if (!this.store.selectSnapshot(UserState.countUsers)) {
            this.store.dispatch(new GetUsers());
        }
        this.store.dispatch(new GetCurrentUser());
        this.items = [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-cog',
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-power-off',
                    },
                ],
            },
            { separator: true },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-sign-out',
            },
        ];
    }

    logout() {
        this.authService.logout();
    }
}
