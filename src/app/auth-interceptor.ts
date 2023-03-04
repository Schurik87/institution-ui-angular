import { Injectable, Inject, Optional } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public messageService: MessageService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('id_token');
        if (idToken) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken),
            });
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('Error: ', JSON.stringify(error));
                // let data = {};
                let message;
                if (error && error.error && error.error.message) {
                    message = error.error.message;
                } else if (error && error.error && error.error.reason) {
                    message = error.error.reason;
                } else {
                    message = JSON.stringify(error.error);
                }
                // data = {
                //     reason:
                //         error && error.error && error.error.reason
                //             ? error.error.reason
                //             : '',
                //     status: error.status,
                // };
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: message,
                    life: 3000,
                });
                return throwError(error);
            })
        );
    }
}
