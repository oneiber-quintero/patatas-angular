import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SubscribersComponent } from './pages/dashboard/subscribers/subscribers.component';
import { HeaderComponent } from './layouts/auth/header/header.component';
import { FooterComponent } from './layouts/auth/footer/footer.component';
import { AsideComponent } from './layouts/dashboard/aside/aside.component';
import { DashboardHeaderComponent } from './layouts/dashboard/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListSubscribersComponent } from './pages/dashboard/subscribers/components/list-subscribers/list-subscribers.component';
import { CreateSusbcribersComponent } from './pages/dashboard/subscribers/components/create-susbcribers/create-susbcribers.component';
import { EditSusbcribersComponent } from './pages/dashboard/subscribers/components/edit-susbcribers/edit-susbcribers.component';
import { SubscriberDetailsComponent } from './pages/dashboard/subscribers/components/subscriber-details/subscriber-details.component';
import { HttpInterceptorInterceptor } from './interceptors/http-interceptor.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubscribersComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    DashboardHeaderComponent,
    ListSubscribersComponent,
    CreateSusbcribersComponent,
    EditSusbcribersComponent,
    SubscriberDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
