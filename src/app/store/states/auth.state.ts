import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';

export interface AuthStateModel {
    token: string | null;
    userName: string | null;
}

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { userName: string; password: string }) {}
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        userName: null,
    },
})
@Injectable()
export class AuthState {
    // @Selector()
    // static token(state: AuthStateModel): string | null {
    //     return state.token;
    // }

    // @Selector()
    // static isAuthenticated(state: AuthStateModel): boolean {
    //     return !!state.token;
    // }

    constructor(private authService: AuthService) {}

    // @Action(Login)
    // login(ctx: StateContext<AuthStateModel>, action: Login) {
    //     return this.authService.login(action.payload).pipe(
    //         tap((token: string ) => {
    //             ctx.patchState({
    //                 token: token,
    //                 userName: action.payload.userName,
    //             });
    //         })
    //     );
    // }

    // @Action(Logout)
    // logout(ctx: StateContext<AuthStateModel>) {
    //     const state = ctx.getState();
    //     return this.authService.logout();
    // }
}
