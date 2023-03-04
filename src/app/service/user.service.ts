import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import { UpdateUser, User, UserResult } from '../api/user';
import { ServiceError } from './service.error.handling';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    url: string = 'http://localhost:3000/users';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getUsers() {
        return this.http.get<User[]>(this.url);
    }

    getUserByUserName(userName: string) {
        return this.http.get<UserResult>(`${this.url}/username/${userName}`);
        // .pipe(catchError(this.handleError));
    }

    getUserById(id: string) {
        return this.http.get<UserResult>(`${this.url}/${id}`);
    }

    updateUser(user: User): Observable<UserResult> {
        let userUpdate: UpdateUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            image: user.image,
            imageSmall: user.imageSmall,
            appLanguage: user.appLanguage,
            type: user.type,
        };
        //Object.assign(userUpdate, user);

        console.log('##### updateUser', userUpdate);
        return this.http.put<UserResult>(`${this.url}/${user.id}`, userUpdate);
        // .pipe(catchError(this.handleError));
    }

    addUser(user: User): Observable<UserResult> {
        let userUpdate: UpdateUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            image: user.image,
            imageSmall: user.imageSmall,
            appLanguage: user.appLanguage,
            type: user.type,
        };
        //Object.assign(userUpdate, user);
        // TODO
        console.log('##### updateUser', userUpdate);
        return this.http.put<UserResult>(`${this.url}/${user.id}`, userUpdate);
        // .pipe(catchError(this.handleError));
    }

    deleteUser(id: string) {
        return this.http.delete<UserResult>(`${this.url}/${id}`);
        // .pipe(catchError(this.handleError));
    }

    // handleError(error: HttpErrorResponse) {
    //     if (error.status === 0) {
    //         // A client-side or network error occurred. Handle it accordingly.
    //         console.error('An error occurred:', error.error);
    //     } else {
    //         // The backend returned an unsuccessful response code.
    //         // The response body may contain clues as to what went wrong.
    //         console.error(
    //             `Backend returned code ${error.status}, body was: `,
    //             error.error
    //         );
    //     }
    //     // Return an observable with a user-facing error message.
    //     return throwError(
    //         () => new Error('Something bad happened; please try again later.')
    //     );
    // }
}
