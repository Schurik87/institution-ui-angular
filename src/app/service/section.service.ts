import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UpdateSection, Section, SectionResult } from '../api/section';

@Injectable({
    providedIn: 'root',
})
export class SectionService {
    url: string = 'http://localhost:3000/sections';

    constructor(private http: HttpClient) {}

    getSections() {
        console.log('##### getSections');
        return this.http.get<Section[]>(this.url);
    }

    getSectionBySectionName(sectionName: string) {
        return this.http.get<SectionResult>(
            `${this.url}/sectionname/${sectionName}`
        );
        // .pipe(catchError(this.handleError));
    }

    updateSection(section: Section): Observable<SectionResult> {
        let sectionUpdate: UpdateSection = {
            name: section.name,
            image: section.image,
            institutionId: section.institutionId,
        };
        //Object.assign(sectionUpdate, section);

        console.log('##### updateSection', sectionUpdate);
        return this.http.put<SectionResult>(
            `${this.url}/${section.id}`,
            sectionUpdate
        );
        // .pipe(catchError(this.handleError));
    }

    addSection(section: Section): Observable<SectionResult> {
        let sectionUpdate: UpdateSection = {
            name: section.name,
            image: section.image,
            institutionId: section.institutionId,
        };
        //Object.assign(sectionUpdate, section);
        // TODO
        console.log('##### updateSection', sectionUpdate);
        return this.http.post<SectionResult>(`${this.url}`, sectionUpdate);
        // .pipe(catchError(this.handleError));
    }

    deleteSection(id: string) {
        return this.http.delete<SectionResult>(`${this.url}/${id}`);
        // .pipe(catchError(this.handleError));
    }
}
