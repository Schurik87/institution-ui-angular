import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from 'src/app/components/shared/user/user-list/user-list.component';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, UserListComponent],
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        console.log('UserManagementComponent loaded');
    }
}
