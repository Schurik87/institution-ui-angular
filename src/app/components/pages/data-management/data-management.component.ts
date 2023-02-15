import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementComponent } from './client-management/client-management.component';
import { EpmloyeeManagementComponent } from './epmloyee-management/epmloyee-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-data-management',
    standalone: true,
    imports: [
        CommonModule,
        ClientManagementComponent,
        EpmloyeeManagementComponent,
        UserManagementComponent,
        CardModule,
        RouterModule,
    ],
    templateUrl: './data-management.component.html',
    styleUrls: ['./data-management.component.scss'],
})
export class DataManagementComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        console.log('DataManagementComponent loaded');
    }
}
