import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { User } from 'src/app/api/user';
import { UserService } from 'src/app/service/user.service';
import { AvatarModule } from 'primeng/avatar';
import { Select, Store } from '@ngxs/store';
import {
    DeleteUser,
    GetUsers,
    UpdateSelectedUser,
    UpdateUser,
} from 'src/app/store/actions/user.action';
import { Observable, Subscription } from 'rxjs';
import { UserState } from 'src/app/store/states/user.state';
import { CalendarModule } from 'primeng/calendar';
import config from '../../../../../config/config.json';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        AvatarModule,
        CalendarModule,
        RouterModule,
        TranslateModule,
    ],
    providers: [MessageService, UserService],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
    userDialog: boolean = false;
    deleteUserDialog: boolean = false;
    deleteUsersDialog: boolean = false;
    @Select(UserState.getUsers) users$?: Observable<User[]>;
    user: User = {};
    selectedUsers: User[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    dateFormat = config['date-format'] || 'DD.MM.YYYY';
    subscription: Subscription;
    constructor(
        private messageService: MessageService,
        private store: Store,
        private router: Router,
        public translate: TranslateService
    ) {}

    ngOnInit() {
        this.store.dispatch(new GetUsers());

        this.cols = [
            { field: 'userName', header: 'User' },
            { field: 'email', header: 'Email' },
            { field: 'firstName', header: 'First-Name' },
            { field: 'lastName', header: 'Last-Name' },
            { field: 'gender', header: 'Gender' },
            { field: 'dateOfBirth', header: 'Date of birth' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' },
        ];
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.store.dispatch(new UpdateSelectedUser(user));
        // this.userDialog = true;
        this.router.navigate(['/users', user.id]);
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        // this.users = this.users?
        // .map(users => users.filter(user => !this.selectedUsers.includes(user));
        // this.users = this.users?.filter(
        //     (val) => !this.selectedUsers.includes(val)
        // );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Users Deleted',
            life: 3000,
        });
        this.selectedUsers = [];
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        if (this.user.id) {
            this.store.dispatch(new DeleteUser(this.user.id));
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'User Deleted',
                life: 3000,
            });
            this.user = {};
        }
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;
        if (this.user) {
            this.store
                .dispatch(new UpdateUser(this.user))
                .subscribe((userUpdated) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: `User '${userUpdated.userName}' Updated`,
                        life: 3000,
                    });
                    this.userDialog = false;
                });
        }
        // if (this.user.userName?.trim()) {
        //     if (this.user.id) {
        //         this.users[this.findIndexById(this.user.id)] = this.user;
        //         this.userService
        //             .updateUser(this.user)
        //             .subscribe((updatedUser) => {
        //                 if (updatedUser) {
        //                     this.user = updatedUser;
        //                     this.users[this.findIndexById(this.user.id || '')] =
        //                         this.user;
        //                     this.messageService.add({
        //                         severity: 'success',
        //                         summary: 'Successful',
        //                         detail: 'User Updated',
        //                         life: 3000,
        //                     });
        //                 }
        //             });
        //     } else {
        //         this.user.id = this.createId();
        //         this.user.image = 'user-placeholder.svg';
        //         this.users.push(this.user);
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'User Created',
        //             life: 3000,
        //         });
        //     }

        //     this.users = [...this.users];
        //     this.userDialog = false;
        //     this.user = {};
        // }
    }

    findIndexById(id: string): number {
        let index = -1;
        // for (let i = 0; i < this.users.length; i++) {
        //     if (this.users[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        console.log(
            '### (event.target as HTMLInputElement).value',
            (event.target as HTMLInputElement).value
        );
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
