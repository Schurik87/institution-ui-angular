import { User } from '../../api/user';

//Update
export class UpdateUser {
    static readonly type = '[User] Update';
    constructor(public user: User) {}
}

//Set Update selected User
export class UpdateSelectedUser {
    static readonly type = '[User] Update selected User';
    constructor(public user: User) {}
}

//Read
export class GetUsers {
    static readonly type = '[Users] Fetch';
}

export class GetUser {
    static readonly type = '[User] Get user';
    constructor(public id: string) {}
}

export class GetCurrentUser {
    static readonly type = '[User] Get current user';
}

//Create
export class AddUser {
    static readonly type = '[User] Add';
    constructor(public user: User) {}
}

//Delete
export class DeleteUser {
    static readonly type = '[User] Delete';
    constructor(public id: string) {}
}
