import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { Section } from 'src/app/api/section';
import { CalendarModule } from 'primeng/calendar';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { SectionState } from 'src/app/store/states/section.state';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
    AddSection,
    GetSections,
    UpdateSection,
} from 'src/app/store/actions/section.action';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { LanguageService } from 'src/app/service/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/api/country';
import { ImageUploadComponent } from '../../image-upload/image-upload/image-upload.component';
import { Institution } from 'src/app/api/institution';
import { InstitutionState } from 'src/app/store/states/institution.state';

@Component({
    selector: 'app-section-detail',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        CalendarModule,
        FileUploadModule,
        RouterModule,
        CardModule,
        ImageModule,
        TranslateModule,
        FileUploadModule,
        ImageUploadComponent,
    ],
    templateUrl: './section-detail.component.html',
    styleUrls: ['./section-detail.component.scss'],
})
export class SectionDetailComponent implements OnInit {
    // @Select(InstitutionState.getInstitutions) institutions$: Observable<Institution>;
    private readonly destroy$ = new Subject();
    sectionId: string = '';
    submitted: boolean = false;
    section: Section;
    section$: Observable<Section | undefined>;

    // institutions$ = this.store.select(InstitutionState.getInstitutions);
    institutions: Institution[] = [];
    selectedInstitution: Institution = { name: '' };
    appLanguageSelcted?: Language;
    uploadedFiles: any[] = [];
    dateOfBirth?: Date;
    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private languageService: LanguageService,
        public translate: TranslateService
    ) {}

    ngOnInit(): void {
        // check if storage is filled
        if (!this.store.selectSnapshot(SectionState.countSections)) {
            this.store.dispatch(new GetSections());
        }
        this.store
            .select(InstitutionState.getInstitutions)
            .pipe(takeUntil(this.destroy$))
            .subscribe((institutions) => (this.institutions = institutions));

        const paramId = this.route.snapshot.paramMap.get('id');
        if (paramId) {
            this.store
                .select(SectionState.getSection)
                .pipe(
                    takeUntil(this.destroy$),
                    map((filterFn) => filterFn(paramId))
                )
                .subscribe((section) => {
                    if (section) {
                        this.section = { ...section };
                        console.log('##### section', section);
                        this.selectedInstitution =
                            this.institutions.find(
                                (institution) =>
                                    institution.id ===
                                    this.section.institutionId
                            ) || {};
                    } else {
                        // lets create a new section
                        this.section = { name: '', institutionId: '' };
                    }
                });
        } else {
            // if no selected section defined in store, redirect to section list
            this.router.navigate(['/sections']);
        }
    }

    cancel() {
        this.submitted = false;
        this.router.navigate(['/sections']);
    }
    saveSection() {
        this.submitted = true;
        console.log('##### this.section', this.section);
        if (this.section) {
            this.section.institutionId = this.selectedInstitution.id || '';
            if (this.section.id) {
                this.store
                    .dispatch(new UpdateSection(this.section))
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((sectionUpdated) => {
                        if (sectionUpdated) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: `Section '${this.section.name}' updated`,
                                life: 3000,
                            });
                            this.router.navigate(['/sections']);
                        }
                    });
            } else {
                this.store
                    .dispatch(new AddSection(this.section))
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((createdSection) => {
                        if (createdSection) {
                            this.router.navigate(['/sections']);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: `Section '${this.section.name}' created`,
                                life: 3000,
                            });
                        }
                    });
            }
        }
    }

    sectionImageChanged(event: string) {
        this.section.image = event;
    }
}
