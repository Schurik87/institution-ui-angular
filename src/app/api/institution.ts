export interface Institution {
    id?: string;
    name?: string;
    image?: string;
}

export interface UpdateInstitution {
    name?: string;
    image?: string;
}

export interface InstitutionResult {
    data: Institution;
    message: string;
}
