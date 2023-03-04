import { Section } from '../../api/section';

//Update
export class UpdateSection {
    static readonly type = '[Section] Update';
    constructor(public section: Section) {}
}

//Read
export class GetSections {
    static readonly type = '[Sections] Fetch';
}

export class GetSection {
    static readonly type = '[Section] Get section';
    constructor(public id: string) {}
}

//Create
export class AddSection {
    static readonly type = '[Section] Add';
    constructor(public section: Section) {}
}

//Delete
export class DeleteSection {
    static readonly type = '[Section] Delete';
    constructor(public id: string) {}
}
