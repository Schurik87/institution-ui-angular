import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'users',
                loadComponent: () =>
                    import('./user/user-list/user-list.component').then(
                        (m) => m.UserListComponent
                    ),
            },
            {
                path: 'users/:id',
                loadComponent: () =>
                    import('./user/user-detail/user-detail.component').then(
                        (m) => m.UserDetailComponent
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class SharedRoutingModule {}
