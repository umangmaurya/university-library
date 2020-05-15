import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../shared/services/storage.service';
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

    isAdmin: boolean = false;
    isLoggedIn: boolean = false;
    constructor(
        private router: Router,
        private store: StorageService
    ) { }


    ngOnInit() {
        this.checkLogin();
    }

    checkLogin() {
        let user = this.store.getData('loggedUser');
        if (user) {
            this.isAdmin = user.isAdmin;
            this.isLoggedIn = true
        }
    }

    logOut() {
        this.store.removeData('loggedUser');
        this.openNewPage('');
        window.location.reload(true);
    }


    openNewPage(pageName: String): void {
        this.router.navigate([`${pageName}`]);
    }
}
