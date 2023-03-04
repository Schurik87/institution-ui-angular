import { Institution } from '../../api/institution';

//Update
export class UpdateInstitution {
    static readonly type = '[Institution] Update';
    constructor(public institution: Institution) {}
}

//Read
export class GetInstitutions {
    static readonly type = '[Institutions] Fetch';
}

export class GetInstitution {
    static readonly type = '[Institution] Get institution';
    constructor(public id: string) {}
}

//Create
export class AddInstitution {
    static readonly type = '[Institution] Add';
    constructor(public institution: Institution) {}
}

//Delete
export class DeleteInstitution {
    static readonly type = '[Institution] Delete';
    constructor(public id: string) {}
}
