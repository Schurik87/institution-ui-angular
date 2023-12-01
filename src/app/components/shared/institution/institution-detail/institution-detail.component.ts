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
import { MessageService, TreeNode } from 'primeng/api';
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
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeTableModule } from 'primeng/treetable';
import { SectionState } from 'src/app/store/states/section.state';
import { TreeModule } from 'primeng/tree';
import { Section } from 'src/app/api/section';
import { GetSectionTree } from 'src/app/store/actions/section.action';

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
        OrganizationChartModule,
        TreeTableModule,
        TreeModule,
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
    data1: TreeNode[];
    data2: TreeNode[];
    data3: TreeNode[];
    sectionTree: TreeNode<Section>[];
    selectedNode: TreeNode;
    files: TreeNode[];
    cols: any[];
    selectedFile: TreeNode;
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
                        if (this.institution.id) {
                            this.store.dispatch(
                                new GetSectionTree(this.institution.id)
                            );
                            this.store
                                .select(SectionState.getSectionTree)
                                .pipe(takeUntil(this.destroy$))
                                .subscribe((sectionTree) => {
                                    console.log(
                                        '### section tree',
                                        sectionTree
                                    );
                                });
                        }
                    } else {
                        // lets create a new institution
                        this.institution = { name: '' };
                    }
                });
        } else {
            // if no selected institution defined in store, redirect to institution list
            this.router.navigate(['/institutions']);
        }
        this.data1 = [
            {
                label: 'CEO',
                styleClass: 'p-person',
                expanded: true,
                data: { name: 'Walter White', avatar: 'walter.jpg' },
                children: [
                    {
                        label: 'CFO',
                        type: 'person',
                        styleClass: 'p-person',
                        expanded: true,
                        data: { name: 'Saul Goodman', avatar: 'saul.jpg' },
                        children: [
                            {
                                label: 'Tax',
                                styleClass: 'department-cfo',
                            },
                            {
                                label: 'Legal',
                                styleClass: 'department-cfo',
                            },
                        ],
                    },
                    {
                        label: 'COO',
                        type: 'person',
                        styleClass: 'p-person',
                        expanded: true,
                        data: { name: 'Mike E.', avatar: 'mike.jpg' },
                        children: [
                            {
                                label: 'Operations',
                                styleClass: 'department-coo',
                            },
                        ],
                    },
                    {
                        label: 'CTO',
                        type: 'person',
                        styleClass: 'p-person',
                        expanded: true,
                        data: { name: 'Jesse Pinkman', avatar: 'jesse.jpg' },
                        children: [
                            {
                                label: 'Development',
                                styleClass: 'department-cto',
                                expanded: true,
                                children: [
                                    {
                                        type: 'person',
                                        styleClass: 'p-person',
                                        label: 'Analysis',
                                        data: {
                                            name: 'test y',
                                            avatar: 'jesse.jpg',
                                        },
                                    },
                                    {
                                        label: 'Front End',
                                        styleClass: 'department-cto',
                                    },
                                    {
                                        label: 'Back End',
                                        styleClass: 'department-cto',
                                    },
                                ],
                            },
                            {
                                label: 'QA',
                                styleClass: 'department-cto',
                            },
                            {
                                label: 'R&D',
                                styleClass: 'department-cto',
                            },
                        ],
                    },
                ],
            },
        ];

        this.data2 = [
            {
                label: 'F.C Barcelona',
                expanded: true,
                children: [
                    {
                        label: 'F.C Barcelona',
                        expanded: true,
                        children: [
                            {
                                label: 'Chelsea FC',
                            },
                            {
                                label: 'F.C. Barcelona',
                            },
                        ],
                    },
                    {
                        label: 'Real Madrid',
                        expanded: true,
                        children: [
                            {
                                label: 'Bayern Munich',
                            },
                            {
                                label: 'Real Madrid',
                            },
                        ],
                    },
                ],
            },
        ];
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
        ];
        this.data3 = [
            {
                data: {
                    name: 'Documents',
                    size: '75kb',
                    type: 'Folder',
                },
                children: [
                    {
                        data: {
                            name: 'Work',
                            size: '55kb',
                            type: 'Folder',
                        },
                        children: [
                            {
                                data: {
                                    name: 'Expenses.doc',
                                    size: '30kb',
                                    type: 'Document',
                                },
                            },
                            {
                                data: {
                                    name: 'Resume.doc',
                                    size: '25kb',
                                    type: 'Resume',
                                },
                            },
                        ],
                    },
                    {
                        data: {
                            name: 'Home',
                            size: '20kb',
                            type: 'Folder',
                        },
                        children: [
                            {
                                data: {
                                    name: 'Invoices',
                                    size: '20kb',
                                    type: 'Text',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                data: {
                    name: 'Pictures',
                    size: '150kb',
                    type: 'Folder',
                },
                children: [
                    {
                        data: {
                            name: 'barcelona.jpg',
                            size: '90kb',
                            type: 'Picture',
                        },
                    },
                    {
                        data: {
                            name: 'primeui.png',
                            size: '30kb',
                            type: 'Picture',
                        },
                    },
                    {
                        data: {
                            name: 'optimus.jpg',
                            size: '30kb',
                            type: 'Picture',
                        },
                    },
                ],
            },
        ];

        this.store
            .select(SectionState.getSections)
            .pipe(takeUntil(this.destroy$))
            .subscribe((sections) => {
                this.files = this.data3;
            });
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
    onNodeSelect(event: any) {
        this.messageService.add({
            severity: 'success',
            summary: 'Node Selected',
            detail: event.node.label,
        });
    }

    // Add child section
    addSection(node: TreeNode) {
        node.children?.push({
            label: 'new section',
            expanded: true,
            styleClass: 'department-cto',
            data: { name: 'new', avatar: 'mike.jpg' },
        });
    }
}
