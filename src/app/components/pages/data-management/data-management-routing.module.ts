import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                loadComponent: () =>
                    import('./data-management.component').then(
                        (m) => m.DataManagementComponent
                    ),
            },
            {
                path: 'clients',
                loadComponent: () =>
                    import(
                        './client-management/client-management.component'
                    ).then((m) => m.ClientManagementComponent),
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./user-management/user-management.component').then(
                        (m) => m.UserManagementComponent
                    ),
            },
            {
                path: 'employees',
                loadComponent: () =>
                    import(
                        './epmloyee-management/epmloyee-management.component'
                    ).then((m) => m.EpmloyeeManagementComponent),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class DataManagementRoutingModule {}
