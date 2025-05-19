import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(
            withFetch(),
        ),
        provideExperimentalZonelessChangeDetection(),
    ],
};
