import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from './features/auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthinterceptorService } from './shared/services/authinterceptor/authinterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackgroundBlockComponent } from './core/components/background-img-block/background-block.component';



@NgModule({
  declarations: [AppComponent, HeaderComponent, BackgroundBlockComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AuthModule,
    EffectsModule.forRoot([]),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
