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
import { Institution } from 'src/app/api/institution';
import { CalendarModule } from 'primeng/calendar';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { InstitutionState } from 'src/app/store/states/institution.state';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
    AddInstitution,
    GetInstitutions,
    UpdateInstitution,
} from 'src/app/store/actions/institution.action';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { LanguageService } from 'src/app/service/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/api/country';
import { ImageUploadComponent } from '../../image-upload/image-upload/image-upload.component';

@Component({
    selector: 'app-institution-detail',
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
    templateUrl: './institution-detail.component.html',
    styleUrls: ['./institution-detail.component.scss'],
})
export class InstitutionDetailComponent implements OnInit {
    private readonly destroy$ = new Subject();
    institutionId: string = '';
    submitted: boolean = false;
    institution: Institution;
    currentInstitution?: Institution;
    institution$: Observable<Institution | undefined>;

    appLanguages: Language[] = [];
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
        this.appLanguages = [
            { name: 'Germany', code: 'DE', langCode: 'de' },
            { name: 'England', code: 'GB', langCode: 'en' },
        ];

        // check if storage is filled
        if (!this.store.selectSnapshot(InstitutionState.countInstitutions)) {
            this.store.dispatch(new GetInstitutions());
        }

        const paramId = this.route.snapshot.paramMap.get('id');
        if (paramId) {
            this.store
                .select(InstitutionState.getInstitution)
                .pipe(
                    takeUntil(this.destroy$),
                    map((filterFn) => filterFn(paramId))
                )
                .subscribe((institution) => {
                    if (institution) {
                        this.institution = { ...institution };
                    } else {
                        // lets create a new institution
                        this.institution = { name: '' };
                    }
                });
        } else {
            // if no selected institution defined in store, redirect to institution list
            this.router.navigate(['/institutions']);
        }
    }

    cancel() {
        this.submitted = false;
        this.router.navigate(['/institutions']);
    }
    saveInstitution() {
        this.submitted = true;
        console.log('##### this.institution', this.institution);
        if (this.institution) {
            if (this.institution.id) {
                this.store
                    .dispatch(new UpdateInstitution(this.institution))
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((institutionUpdated) => {
                        if (institutionUpdated) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: `Institution '${this.institution.name}' updated`,
                                life: 3000,
                            });
                            this.router.navigate(['/institutions']);
                        }
                    });
            } else {
                this.store
                    .dispatch(new AddInstitution(this.institution))
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((createdInstitution) => {
                        if (createdInstitution) {
                            this.router.navigate(['/institutions']);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: `Institution '${this.institution.name}' created`,
                                life: 3000,
                            });
                        }
                    });
            }
        }
    }

    institutionImageChanged(event: string) {
        this.institution.image = event;
    }
}
