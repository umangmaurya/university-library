import { Component, OnInit } from '@angular/core';
import { StorageService } from './../shared/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})

export class BookListComponent implements OnInit {

    /* user variables */
    isAdmin: boolean = false;
    isLoggedIn: boolean = false;
    name: string = 'Guest';


    /* books variables */
    searchKey: string = 'java'; // by default java books are loaded
    bookList: any[];
    allList: any[];

    /* View switch */
    listView: boolean = false;
    showFav: boolean = false;

    index: number = 0; // page number
    recordPerPage: number = 8; // grid view 8 items max will be displayed
    isRightArrowDisabled: boolean = false

    constructor(
        private store: StorageService,
        private httpClient: HttpClient,
        private toast: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.checkLogin();;
        this.getBookList();
    }
    /**
     * Checked for loggedUser role
     */
    checkLogin() {
        let user = this.store.getData('loggedUser');
        if (user) {
            this.isAdmin = user.isAdmin;
            this.isLoggedIn = true;
            this.name = user.name;
        }
    }

    /**
     * This method help us to get books call
     * with entered search key words
     */
    searchBooks() {
        if (this.searchKey.length > 2) {
            this.getBookList();
        } else {
            this.toastNotification({ type: 'error', message: 'Please enter at least 3 characters' });
        }
    }

    /**
     * @param  {String} {type : error,success or info
     * @param  {String} message: text message you want to show}
     */
    toastNotification({ type, message }) {
        this.toast[type](message);
    }


    /**
     * Method help us to load books
     */
    getBookList() {

        let url = `https://www.googleapis.com/books/v1/volumes?q=${this.searchKey},maxResults=20`;

        /* Check if there books added by admin user */
        let newBooks = this.store.getData('newBooks') || [];

        this.httpClient.get(url).subscribe(
            res => {
                const { items } = res as any;
                items.forEach(element => {
                    element.isFav = false;
                    if (element.volumeInfo.authors && Array.isArray(element.volumeInfo.authors)) {
                        element.volumeInfo.authorsName = element.volumeInfo.authors.join(',');
                    } else {
                        element.volumeInfo.authorsName = "NA"
                    }
                });
                this.allList = newBooks.concat(items); // Copy
                this.bookList = newBooks.concat(items).slice(0, this.recordPerPage); // for pagination
            }
        )
    }

    /**
     * Navigates to add new book form page
     */
    addNewBook() {
        this.router.navigate(['addNewBook']);
    }

    /**
     * @param  {string} message
     * Show toast message while adding and removing favorates
     */
    showInfo(message: string) {
        this.toastNotification({ type: 'info', message: `${message} favourites` });
    }

    /**
     * Switch between grid and list view
     */
    toggleView() {
        this.listView = !this.listView;
        if (this.listView) {
            this.recordPerPage = 4; // showing only 4 books in case of list view
        } else {
            this.recordPerPage = 8; // showing 8 books in case of grid view
        }
        this.createPaginationWiseData();
    }

    /**
     * @param  {string} type
     * Showing All books or favorates
     */
    favoratesAndAll() {
        this.showFav = !this.showFav;
        if (!this.showFav) {
            this.showFav = false;
            this.bookList = this.allList;
        } else {
            this.allList = this.bookList;
            this.bookList = this.bookList.filter(item => item.isFav == true);
        }
    }

    /**
     * This method will open 
     * book detail page
     */
    navigateToDetail(id: string) {
        this.router.navigate(['bookDetail'], { queryParams: { volume_id: id } });
    }

    /**
     * Filtering books Page wise
     */
    createPaginationWiseData() {
        let start = this.index * this.recordPerPage
        this.bookList = [];
        for (start; start < this.allList.length && this.bookList.length < this.recordPerPage; start++) {
            this.bookList.unshift(this.allList[start]);
        }

        let pageDataLength = this.recordPerPage * (this.index + 1)
        if (pageDataLength >= this.allList.length) {
            this.isRightArrowDisabled = true;
        } else {
            this.isRightArrowDisabled = false;
        }

    }

    /**
     * Show previous data on backward
     */
    prevPage() {
        this.index--;
        this.createPaginationWiseData()
    }

    /**
     * Show remaining data on forward
     */
    nextPage() {
        this.index++;
        this.createPaginationWiseData()
    }

}
