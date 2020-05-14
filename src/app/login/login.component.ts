import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    ngOnInit(): void {
    }

    constructor(private router: Router) { }

    openNewPage(pageName: String): void {
        this.router.navigate([`${pageName}`]);
    }

}
