import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private router: Router) { }

    /**
     * @param  {String} pageName
     * @returns void
     * Used in Common Header, for navigating
     */
    openNewPage(pageName: String): void {
        this.router.navigate([`${pageName}`]);
    }
}
