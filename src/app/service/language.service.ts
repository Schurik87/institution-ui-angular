import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import config from '../../config/config.json';

@Injectable()
export class LanguageService {
    subscription: Subscription;

    constructor(
        public translate: TranslateService,
        public primeNGConfig: PrimeNGConfig
    ) {
        const appLanguages = config['appLanguages'] || [];
        const appLanguageDefault = config['appLanguageDefault'];
        this.translate.addLangs(appLanguages);
        this.translate.setDefaultLang(appLanguageDefault);

        const browserLang = this.translate.getBrowserLang();
        let lang = browserLang?.match(/en|de/) ? browserLang : 'en';
        this.changeLang(lang);

        this.subscription = this.translate
            .stream('primeng')
            .subscribe((data) => {
                this.primeNGConfig.setTranslation(data);
            });
    }

    setDefaultLanguage() {
        const appLanguageDefault = config['appLanguageDefault'];
        this.translate.use(appLanguageDefault.toLowerCase());
    }

    changeLang(lang: string) {
        this.translate.use(lang.toLowerCase());
    }
}
