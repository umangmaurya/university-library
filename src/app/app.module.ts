/* Import Angular modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

/* Toast imports */
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './shared/services/storage.service';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LandingComponent,
        AddNewBookComponent,
        BookListComponent,
        BookDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot({ timeOut: 2500, preventDuplicates: false, positionClass: 'toast-bottom-left' }),
    ],
    providers: [StorageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
