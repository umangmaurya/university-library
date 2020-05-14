import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Import Components */
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';


/* Defining Routes for component */
const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'addNewBook', component: AddNewBookComponent },
    { path: 'bookDetail', component: BookDetailComponent },
    { path: 'bookList', component: BookListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
