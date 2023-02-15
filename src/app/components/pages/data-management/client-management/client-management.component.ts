import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-client-management',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './client-management.component.html',
    styleUrls: ['./client-management.component.scss'],
})
export class ClientManagementComponent {
    constructor() {}
}
