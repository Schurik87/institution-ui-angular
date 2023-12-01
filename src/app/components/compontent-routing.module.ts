import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./shared/user/user-list/user-list.component').then(
                        (m) => m.UserListComponent
                    ),
            },
            {
                path: 'users/:id',
                loadComponent: () =>
                    import(
                        './shared/user/user-detail/user-detail.component'
                    ).then((m) => m.UserDetailComponent),
            },
            {
                path: 'institutions',
                loadComponent: () =>
                    import(
                        './shared/institution/institution-list/institution-list.component'
                    ).then((m) => m.InstitutionListComponent),
            },
            {
                path: 'institutions/:id',
                loadComponent: () =>
                    import(
                        './shared/institution/institution-detail/institution-detail.component'
                    ).then((m) => m.InstitutionDetailComponent),
            },
            {
                path: 'sections',
                loadComponent: () =>
                    import(
                        './shared/section/section-list/section-list.component'
                    ).then((m) => m.SectionListComponent),
            },
            {
                path: 'sections/:id',
                loadComponent: () =>
                    import(
                        './shared/section/section-detail/section-detail.component'
                    ).then((m) => m.SectionDetailComponent),
            },
            {
                path: 'sections/:id/member',
                loadComponent: () =>
                    import(
                        './shared/section/section-member/section-member.component'
                    ).then((m) => m.SectionMemberComponent),
            },
            {
                path: 'uikit',
                loadChildren: () =>
                    import('./uikit/uikit.module').then((m) => m.UIkitModule),
            },
            {
                path: 'utilities',
                loadChildren: () =>
                    import('./utilities/utilities.module').then(
                        (m) => m.UtilitiesModule
                    ),
            },
            {
                path: 'documentation',
                loadChildren: () =>
                    import('./documentation/documentation.module').then(
                        (m) => m.DocumentationModule
                    ),
            },
            {
                path: 'blocks',
                loadChildren: () =>
                    import('./primeblocks/primeblocks.module').then(
                        (m) => m.PrimeBlocksModule
                    ),
            },
            {
                path: 'pages',
                loadChildren: () =>
                    import('./pages/pages.module').then((m) => m.PagesModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ComponentRoutingModule {}
