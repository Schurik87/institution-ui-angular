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
import { PickListModule } from 'primeng/picklist';
import { LanguageService } from 'src/app/service/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/api/country';
import { ImageUploadComponent } from '../../image-upload/image-upload/image-upload.component';
import { Institution } from 'src/app/api/institution';
import { InstitutionState } from 'src/app/store/states/institution.state';
import { User } from 'src/app/api/user';
import { UserState } from 'src/app/store/states/user.state';

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
        PickListModule,
    ],
    templateUrl: './section-member.component.html',
    styleUrls: ['./section-member.component.scss'],
})
export class SectionMemberComponent implements OnInit {
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
    sourceEmployees: User[] = [];
    targetEmployees: User[] = [];
    sourceClients: User[] = [];
    targetClients: User[] = [];
    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private languageService: LanguageService,
        public translate: TranslateService
    ) {}

    ngOnInit(): void {
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
                    } else {
                        this.router.navigate(['/sections']);
                    }
                    this.store.select(UserState.getUsers).subscribe((users) => {
                        this.sourceEmployees = [...users];
                        this.sourceClients = [...users];
                    });
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
    }

    sectionImageChanged(event: string) {
        // this.section.image = event;
    }
}
