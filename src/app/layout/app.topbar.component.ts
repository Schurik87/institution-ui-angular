import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../api/user';
import { AuthService } from '../service/auth.service';
import { GetInstitutions } from '../store/actions/institution.action';
import { GetCurrentUser, GetUsers } from '../store/actions/user.action';
import { Logout } from '../store/states/auth.state';
import { UserState } from '../store/states/user.state';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss'],
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    @Select(UserState.getCurrentUser) currentUser$?: Observable<User>;
    currentUser?: User;
    private readonly destroy$ = new Subject();

    constructor(
        public layoutService: LayoutService,
        private store: Store,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        if (!this.store.selectSnapshot(UserState.countUsers)) {
            this.store.dispatch(new GetUsers());
        }
        this.store.dispatch(new GetInstitutions());
        this.store.dispatch(new GetCurrentUser());
        this.store
            .select(UserState.getCurrentUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe((currentUser) => {
                this.currentUser = currentUser;
                this.items = [
                    {
                        label: 'Customers',
                        icon: 'pi pi-fw pi-table',
                        items: [
                            {
                                label: 'New',
                                icon: 'pi pi-fw pi-plus',
                                items: [
                                    {
                                        label: 'Customer',
                                        icon: 'pi pi-fw pi-plus',
                                    },
                                    {
                                        label: 'Duplicate',
                                        icon: 'pi pi-fw pi-copy',
                                    },
                                ],
                            },
                            {
                                label: 'Edit',
                                icon: 'pi pi-fw pi-user-edit',
                            },
                        ],
                    },
                    {
                        label: 'Profile',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Settings',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['users', this.currentUser?.id],
                            },
                            {
                                label: 'Logout',
                                icon: 'pi pi-fw pi-power-off',
                                command: (event) => {
                                    this.logout();
                                    //event.originalEvent: Browser event
                                    //event.item: menuitem metadata
                                },
                            },
                        ],
                    },
                    { separator: true },
                    {
                        label: 'Quit',
                        icon: 'pi pi-fw pi-sign-out',
                    },
                ];
            });
    }

    logout() {
        this.authService.logout();
    }
}
