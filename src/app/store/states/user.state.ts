import {
    Action,
    createSelector,
    Selector,
    State,
    StateContext,
} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UserService } from '../../service/user.service';
import {
    AddUser,
    DeleteUser,
    GetCurrentUser,
    GetUser,
    GetUsers,
    UpdateSelectedUser,
    UpdateUser,
} from '../actions/user.action';
import { User } from '../../api/user';
import { Injectable } from '@angular/core';
import { JWTTokenService } from 'src/app/service/jwt-token.service';

export class UserStateModel {
    users: User[] = [];
    selectedUser?: User = undefined;
    currentUser?: User = undefined;
    user?: User;
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        selectedUser: undefined,
        currentUser: undefined,
        user: undefined,
    },
})
@Injectable()
export class UserState {
    constructor(
        private userService: UserService,
        private jwtService: JWTTokenService
    ) {}

    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }

    @Selector()
    static countUsers(state: UserStateModel) {
        return state.users.length;
    }

    @Selector()
    static getSelectedUser(state: UserStateModel) {
        return state.selectedUser;
    }

    @Selector()
    static getCurrentUser(state: UserStateModel): User | undefined {
        return state.currentUser;
    }

    @Selector()
    static getUser2(state: UserStateModel) {
        return (id: string) => {
            return state.users.find((user) => user.id === id);
        };
    }

    @Action(GetUsers)
    getUsers({ getState, setState }: StateContext<UserStateModel>) {
        return this.userService.getUsers().pipe(
            tap((users) => {
                const state = getState();
                setState({
                    ...state,
                    users: users,
                });
            })
        );
    }

    @Action(GetCurrentUser)
    getCurrentUser({ getState, setState }: StateContext<UserStateModel>) {
        const userName = this.jwtService.getUserName() || '';
        return this.userService.getUserByUserName(userName).pipe(
            tap((userResult) => {
                const state = getState();
                const user = userResult.data;
                setState({
                    ...state,
                    currentUser: user,
                });
            })
        );
    }

    @Action(GetUser)
    getUserById(
        { getState, setState }: StateContext<UserStateModel>,
        id: string
    ) {
        return this.userService.getUsers().pipe(
            tap((users) => {
                const state = getState();
                const userFound = users.find((user) => user.id === id);
                setState({
                    ...state,
                    user: userFound,
                });
            })
        );
    }

    @Action(UpdateUser)
    updateSelectedUser(
        { getState, setState }: StateContext<UserStateModel>,
        { user }: UpdateUser
    ) {
        return this.userService.updateUser(user).pipe(
            tap((result) => {
                const state = getState();
                const userList = [...state.users];
                const todoIndex = userList.findIndex(
                    (item) => item.id === user.id
                );
                console.log('###result', result);
                userList[todoIndex] = result.data;
                setState({
                    ...state,
                    users: userList,
                });
            })
        );
    }

    @Action(DeleteUser)
    deletetUserById(
        { getState, setState }: StateContext<UserStateModel>,
        payload: any
    ) {
        return this.userService.deleteUser(payload.id).pipe(
            tap((userResult) => {
                const state = getState();
                const userList = [...state.users];
                const userListNew = userList.filter(
                    (user) => user.id !== userResult.data.id
                );
                setState({
                    ...state,
                    users: userListNew,
                });
            })
        );
    }
}
