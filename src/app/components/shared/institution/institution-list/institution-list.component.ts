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
import { Institution } from 'src/app/api/institution';
import { InstitutionService } from 'src/app/service/institution.service';
import { AvatarModule } from 'primeng/avatar';
import { Select, Store } from '@ngxs/store';
import {
    DeleteInstitution,
    GetInstitutions,
    UpdateInstitution,
} from 'src/app/store/actions/institution.action';
import { Observable, Subscription } from 'rxjs';
import { InstitutionState } from 'src/app/store/states/institution.state';
import { CalendarModule } from 'primeng/calendar';
import config from '../../../../../config/config.json';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-institution-list',
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
    providers: [InstitutionService],
    templateUrl: './institution-list.component.html',
    styleUrls: ['./institution-list.component.scss'],
})
export class InstitutionListComponent implements OnInit {
    institutionDialog: boolean = false;
    deleteInstitutionDialog: boolean = false;
    deleteInstitutionsDialog: boolean = false;
    institution: Institution = { name: '' };
    institutions: Institution[] = [];
    selectedInstitutions: Institution[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [10, 20, 50];
    subscription: Subscription;
    constructor(
        private messageService: MessageService,
        private store: Store,
        private router: Router,
        public translate: TranslateService
    ) {}

    ngOnInit() {
        console.log('### dispatch GetInstitutions');
        this.store.dispatch(new GetInstitutions());
        this.store
            .select(InstitutionState.getInstitutions)
            .subscribe((institutions) => {
                if (institutions && institutions.length > 0) {
                    this.institutions = [...institutions];
                } else {
                    this.institutions = [];
                }
            });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
        ];
    }

    openNew() {
        this.institution = { name: '' };
        this.router.navigate(['/institutions/new']);
    }

    deleteSelectedInstitutions() {
        this.deleteInstitutionsDialog = true;
    }

    editInstitution(institution: Institution) {
        this.institution = { ...institution };
        this.router.navigate(['/institutions', institution.id]);
    }

    deleteInstitution(institution: Institution) {
        this.deleteInstitutionDialog = true;
        this.institution = { ...institution };
    }

    confirmDeleteSelected() {
        this.deleteInstitutionsDialog = false;
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Institutions Deleted',
            life: 3000,
        });
        this.selectedInstitutions = [];
    }

    confirmDelete() {
        this.deleteInstitutionDialog = false;
        if (this.institution.id) {
            this.store.dispatch(new DeleteInstitution(this.institution.id));
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Institution Deleted',
                life: 3000,
            });
            this.institution = { name: '' };
        }
    }

    hideDialog() {
        this.institutionDialog = false;
        this.submitted = false;
    }

    saveInstitution() {
        this.submitted = true;
        if (this.institution) {
            this.store
                .dispatch(new UpdateInstitution(this.institution))
                .subscribe((institutionUpdated) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: `Institution '${institutionUpdated.institutionName}' Updated`,
                        life: 3000,
                    });
                    this.institutionDialog = false;
                });
        }
        // if (this.institution.institutionName?.trim()) {
        //     if (this.institution.id) {
        //         this.institutions[this.findIndexById(this.institution.id)] = this.institution;
        //         this.institutionService
        //             .updateInstitution(this.institution)
        //             .subscribe((updatedInstitution) => {
        //                 if (updatedInstitution) {
        //                     this.institution = updatedInstitution;
        //                     this.institutions[this.findIndexById(this.institution.id || '')] =
        //                         this.institution;
        //                     this.messageService.add({
        //                         severity: 'success',
        //                         summary: 'Successful',
        //                         detail: 'Institution Updated',
        //                         life: 3000,
        //                     });
        //                 }
        //             });
        //     } else {
        //         this.institution.id = this.createId();
        //         this.institution.image = 'institution-placeholder.svg';
        //         this.institutions.push(this.institution);
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Institution Created',
        //             life: 3000,
        //         });
        //     }

        //     this.institutions = [...this.institutions];
        //     this.institutionDialog = false;
        //     this.institution = {};
        // }
    }

    findIndexById(id: string): number {
        let index = -1;
        // for (let i = 0; i < this.institutions.length; i++) {
        //     if (this.institutions[i].id === id) {
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
