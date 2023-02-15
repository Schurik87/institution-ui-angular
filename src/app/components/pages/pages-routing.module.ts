import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'crud',
                loadChildren: () =>
                    import('./crud/crud.module').then((m) => m.CrudModule),
            },
            {
                path: 'empty',
                loadChildren: () =>
                    import('./empty/emptydemo.module').then(
                        (m) => m.EmptyDemoModule
                    ),
            },
            {
                path: 'timeline',
                loadChildren: () =>
                    import('./timeline/timelinedemo.module').then(
                        (m) => m.TimelineDemoModule
                    ),
            },
            {
                path: 'data-management',
                loadChildren: () =>
                    import(
                        './data-management/data-management-routing.module'
                    ).then((m) => m.DataManagementRoutingModule),
            },
            // {
            //     path: 'data-management/clients',
            //     loadComponent: () =>
            //         import(
            //             './data-management/client-management/client-management.component'
            //         ).then((m) => m.ClientManagementComponent),
            // },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
