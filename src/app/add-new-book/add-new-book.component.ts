import { Component, OnInit } from '@angular/core';
import { StorageService } from './../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-new-book',
    templateUrl: './add-new-book.component.html',
    styleUrls: ['./add-new-book.component.scss']
})
export class AddNewBookComponent implements OnInit {

    volumeInfo = {
        title: '',
        subtitle: '',
        imageLinks: {
            thumbnail: 'http://books.google.com/books/content?id=e7D-mITABmEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
        },
        authorsName: '',
        publisher: '',
        description: '',
        publishedDate: "20-12-2021"
    }

    id: string = 'e7D-mITABmEC';

    constructor(
        private store: StorageService,
        private router: Router,


    ) { }

    ngOnInit(): void {
    }

    /**
     * Saves book in local storage
     */
    submitBook() {

        /* Creates new book object used similar in book list*/
        let book = {
            id: this.id,
            isFav: false,
            volumeInfo: this.volumeInfo
        }
        let newBooks = this.store.getData('newBooks') || [];
        newBooks.push(book);
        this.store.saveData('newBooks', newBooks); // saving in local strorage
        this.router.navigate(['bookList']);
    }

}
