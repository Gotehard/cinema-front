import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MainMenuComponent} from './layout/main-menu/main-menu.component';
import {SiteNotFoundComponent} from './shared/components/site-not-found/site-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {InitialConfigService} from "./shared/services/initial-config.service";
import {UnauthorizedComponent} from './shared/components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainMenuComponent,
    SiteNotFoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: initFunction, deps: [InitialConfigService], multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function initFunction(config: InitialConfigService) {
  return () => config.init();
}
