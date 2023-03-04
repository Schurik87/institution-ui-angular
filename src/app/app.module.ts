import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductService } from './service/product.service';
import { CountryService } from './service/country.service';
import { CustomerService } from './service/customer.service';
import { EventService } from './service/event.service';
import { IconService } from './service/icon.service';
import { NodeService } from './service/node.service';
import { PhotoService } from './service/photo.service';

//NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { DesignutilityService } from './components/designutility.service';
import { UserState } from './store/states/user.state';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { AuthState } from './store/states/auth.state';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './components/auth/auth.guard';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { JWTTokenService } from './service/jwt-token.service';
import { LocalStorageService } from './service/local-storage.sevice';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './service/language.service';
import { InstitutionState } from './store/states/institution.state';
import { SectionState } from './store/states/section.state';
import { Toast, ToastModule } from 'primeng/toast';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}
export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
        deps: [MessageService],
    },
];

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        NgxsModule.forRoot(
            [AuthState, UserState, InstitutionState, SectionState],
            {
                developmentMode: !environment.production,
            }
        ),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ToastModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        DesignutilityService,
        MessageService,
        AuthService,
        AuthGuard,
        AuthInterceptor,
        httpInterceptorProviders,
        JWTTokenService,
        LocalStorageService,
        LanguageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
