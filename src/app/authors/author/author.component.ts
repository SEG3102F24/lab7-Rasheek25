import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthorsService } from '../service/authors.service';
import { Author } from 'src/app/books/model/book';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [NgIf],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorsService: AuthorsService = inject(AuthorsService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorsService.getAuthorById(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
        },
        error: (_: any) => {
          this.selectedAuthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
