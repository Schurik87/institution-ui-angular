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
import { User } from 'src/app/api/user';
import { CalendarModule } from 'primeng/calendar';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { UserState } from 'src/app/store/states/user.state';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
    AddUser,
    GetCurrentUser,
    GetUser,
    GetUsers,
    UpdateUser,
} from 'src/app/store/actions/user.action';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { LanguageService } from 'src/app/service/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/api/country';
import { ImageUploadComponent } from '../../image-upload/image-upload/image-upload.component';

@Component({
    selector: 'app-user-detail',
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
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    private readonly destroy$ = new Subject();
    userId: string = '';
    submitted: boolean = false;
    user: User;
    currentUser?: User;
    user$: Observable<User | undefined>;

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
        if (!this.store.selectSnapshot(UserState.countUsers)) {
            this.store.dispatch(new GetUsers());
        }

        this.store.select(UserState.getCurrentUser).subscribe((currentUser) => {
            this.currentUser = currentUser;
        });

        const paramId = this.route.snapshot.paramMap.get('id');
        if (paramId) {
            this.store.dispatch(new GetUser(paramId));
            this.store
                .select(UserState.getUser)
                .pipe(
                    takeUntil(this.destroy$),
                    map((filterFn) => filterFn(paramId))
                )
                .subscribe((user) => {
                    if (user) {
                        this.user = { ...user };
                        this.dateOfBirth = new Date(
                            this.user.dateOfBirth || ''
                        );
                        if (this.user.appLanguage) {
                            this.appLanguageSelcted = this.appLanguages.find(
                                (language) =>
                                    language.langCode === this.user?.appLanguage
                            );
                        }
                    } else {
                        // lets create a new user
                        this.user = {};
                    }
                });
        } else {
            // if no selected user defined in store, redirect to user list
            this.router.navigate(['/users']);
        }
    }

    cancel() {
        this.submitted = false;
        this.router.navigate(['/users']);
    }
    saveUser() {
        this.submitted = true;
        if (this.user) {
            if (this.appLanguageSelcted) {
                this.user.appLanguage = this.appLanguageSelcted.langCode;
            }
            if (this.dateOfBirth) {
                this.user.dateOfBirth = this.dateOfBirth;
            }
            if (this.user.id) {
                this.store
                    .dispatch(new UpdateUser(this.user))
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((userUpdated) => {
                        if (userUpdated) {
                            this.router.navigate(['/users']);
                            if (
                                this.user?.appLanguage &&
                                this.user.id === this.currentUser?.id
                            ) {
                                this.store.dispatch(new GetCurrentUser());
                                this.languageService.changeLang(
                                    this.user.appLanguage.toLowerCase()
                                );
                            }
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: `User '${this.user.userName}' updated`,
                                life: 3000,
                            });
                        }
                    });
            } else {
                this.store
                    .dispatch(new AddUser(this.user))
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((createdUser) => {
                        if (createdUser) {
                            this.router.navigate(['/users']);
                            if (
                                this.user?.appLanguage &&
                                this.user.id === this.currentUser?.id
                            ) {
                                this.store.dispatch(new GetCurrentUser());
                                this.languageService.changeLang(
                                    this.user.appLanguage.toLowerCase()
                                );
                            }
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: `User '${this.user.userName}' created`,
                                life: 3000,
                            });
                        }
                    });
            }
        }
    }

    userImageChanged(event: string) {
        this.user.image = event;
    }
}
