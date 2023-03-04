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
import { Section } from 'src/app/api/section';
import { SectionService } from 'src/app/service/section.service';
import { AvatarModule } from 'primeng/avatar';
import { Select, Store } from '@ngxs/store';
import {
    DeleteSection,
    GetSections,
    UpdateSection,
} from 'src/app/store/actions/section.action';
import { Observable, Subscription } from 'rxjs';
import { SectionState } from 'src/app/store/states/section.state';
import { CalendarModule } from 'primeng/calendar';
import config from '../../../../../config/config.json';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-section-list',
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
    providers: [SectionService],
    templateUrl: './section-list.component.html',
    styleUrls: ['./section-list.component.scss'],
})
export class SectionListComponent implements OnInit {
    sectionDialog: boolean = false;
    deleteSectionDialog: boolean = false;
    deleteSectionsDialog: boolean = false;
    section: Section = { name: '', institutionId: '' };
    sections: Section[] = [];
    selectedSections: Section[] = [];
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
        console.log('### dispatch GetSections');
        this.store.dispatch(new GetSections());
        this.store.select(SectionState.getSections).subscribe((sections) => {
            if (sections && sections.length > 0) {
                this.sections = [...sections];
            } else {
                this.sections = [];
            }
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
        ];
    }

    openNew() {
        this.section = { name: '', institutionId: '' };
        this.router.navigate(['/sections/new']);
    }

    deleteSelectedSections() {
        this.deleteSectionsDialog = true;
    }

    editSection(section: Section) {
        this.section = { ...section };
        this.router.navigate(['/sections', section.id]);
    }

    deleteSection(section: Section) {
        this.deleteSectionDialog = true;
        this.section = { ...section };
    }

    confirmDeleteSelected() {
        this.deleteSectionsDialog = false;
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Sections Deleted',
            life: 3000,
        });
        this.selectedSections = [];
    }

    confirmDelete() {
        this.deleteSectionDialog = false;
        if (this.section.id) {
            this.store.dispatch(new DeleteSection(this.section.id));
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Section Deleted',
                life: 3000,
            });
            this.section = { name: '', institutionId: '' };
        }
    }

    hideDialog() {
        this.sectionDialog = false;
        this.submitted = false;
    }

    saveSection() {
        this.submitted = true;
        if (this.section) {
            this.store
                .dispatch(new UpdateSection(this.section))
                .subscribe((sectionUpdated) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: `Section '${sectionUpdated.sectionName}' Updated`,
                        life: 3000,
                    });
                    this.sectionDialog = false;
                });
        }
        // if (this.section.sectionName?.trim()) {
        //     if (this.section.id) {
        //         this.sections[this.findIndexById(this.section.id)] = this.section;
        //         this.sectionService
        //             .updateSection(this.section)
        //             .subscribe((updatedSection) => {
        //                 if (updatedSection) {
        //                     this.section = updatedSection;
        //                     this.sections[this.findIndexById(this.section.id || '')] =
        //                         this.section;
        //                     this.messageService.add({
        //                         severity: 'success',
        //                         summary: 'Successful',
        //                         detail: 'Section Updated',
        //                         life: 3000,
        //                     });
        //                 }
        //             });
        //     } else {
        //         this.section.id = this.createId();
        //         this.section.image = 'section-placeholder.svg';
        //         this.sections.push(this.section);
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Section Created',
        //             life: 3000,
        //         });
        //     }

        //     this.sections = [...this.sections];
        //     this.sectionDialog = false;
        //     this.section = {};
        // }
    }

    findIndexById(id: string): number {
        let index = -1;
        // for (let i = 0; i < this.sections.length; i++) {
        //     if (this.sections[i].id === id) {
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
