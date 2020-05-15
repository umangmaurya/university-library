import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

    bookDetails: any = {}

    constructor(
        private httpClient: HttpClient,
        private route: ActivatedRoute

    ) { }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                this.getBookDetails(params.volume_id);

            });
    }

    /**
     * @param  {string} volumeId
     * On load fetch book details
     */
    getBookDetails(volumeId: string) {

        let url = `https://www.googleapis.com/books/v1/volumes/${volumeId}`;
        this.httpClient.get(url).subscribe(
            res => {
                let book = res as any || {};
                book.volumeInfo.authorsName = book.volumeInfo.authors.join(', ');
                book.volumeInfo.description = book.volumeInfo.description.replace(/(<([^>]+)>)/ig, '');
                this.bookDetails = book;

            }
        )
    }
}
