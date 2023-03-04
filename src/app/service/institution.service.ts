import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
    UpdateInstitution,
    Institution,
    InstitutionResult,
} from '../api/institution';

@Injectable({
    providedIn: 'root',
})
export class InstitutionService {
    url: string = 'http://localhost:3000/institutions';

    constructor(private http: HttpClient) {}

    getInstitutions() {
        console.log('##### getInstitutions');
        return this.http.get<Institution[]>(this.url);
    }

    getInstitutionByInstitutionName(institutionName: string) {
        return this.http.get<InstitutionResult>(
            `${this.url}/institutionname/${institutionName}`
        );
        // .pipe(catchError(this.handleError));
    }

    updateInstitution(institution: Institution): Observable<InstitutionResult> {
        let institutionUpdate: UpdateInstitution = {
            name: institution.name,
            image: institution.image,
        };
        //Object.assign(institutionUpdate, institution);

        console.log('##### updateInstitution', institutionUpdate);
        return this.http.put<InstitutionResult>(
            `${this.url}/${institution.id}`,
            institutionUpdate
        );
        // .pipe(catchError(this.handleError));
    }

    addInstitution(institution: Institution): Observable<InstitutionResult> {
        let institutionUpdate: UpdateInstitution = {
            name: institution.name,
            image: institution.image,
        };
        //Object.assign(institutionUpdate, institution);
        // TODO
        console.log('##### updateInstitution', institutionUpdate);
        return this.http.post<InstitutionResult>(
            `${this.url}`,
            institutionUpdate
        );
        // .pipe(catchError(this.handleError));
    }

    deleteInstitution(id: string) {
        return this.http.delete<InstitutionResult>(`${this.url}/${id}`);
        // .pipe(catchError(this.handleError));
    }
}
