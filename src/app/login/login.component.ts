import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../shared/services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

    email: string = '';
    password: string = '';
    users: any[];
    loggedUser: Object;

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.getUsers();
    }

    constructor(private router: Router,
        private toast: ToastrService,
        private httpService: HttpClient,
        private store: StorageService

    ) { }
    /**
     * @param  {String} pageName
     * @returns void
     * Used for Navigation between pages
     */
    openNewPage(pageName: String): void {
        this.router.navigate([`${pageName}`]);
    }

    /**
     * Fetch list of existing user
     * To Validate client login
     */
    getUsers() {
        this.httpService.get('https://my-json-server.typicode.com/umangmaurya/dummyData/users')
            .subscribe(res => {
                this.users = res as any[];
            });
    }


    /**
     * @param  {String} {type : error,success or info
     * @param  {String} message: text message you want to show}
     */
    toastNotification({ type, message }) {
        this.toast[type](message);
    }


    /**
     * Client side validation with existing users
     */
    login() {
        if (this.validateEmail(this.email) && (this.password.length > 0)) {

            let user = this.users.find(item => item.email === this.email && item.password === this.password) || {};

            if (Object.keys(user).length) {
                this.loggedUser = user;
                this.toastNotification({ type: 'success', message: 'Login Successful' });
                this.store.saveData('loggedUser', this.loggedUser);
                this.openNewPage('bookList');
            } else {
                this.toastNotification({ type: 'error', message: 'Invalid Details' });
            }
        } else {
            this.toastNotification({ type: 'error', message: 'Invalid Details' });
        }
    }

    /**
     * @param  {string} email
     * To Validate email format
     */
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

}
