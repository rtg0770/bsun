import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { DocumentService } from '@bishub-energy/shared-services';

@Component({
  selector: 'bishub-energy-table-of-contents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.scss',
})
export class TableOfContentsComponent implements OnInit, OnDestroy {
  articleUrl = '';
  documentHtml$: Observable<string>;
  tocItems: { id: string; text: string }[] = [];
  private docSubscription?: Subscription;

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {
    this.documentHtml$ = this.documentService.getDocumentHtml();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const articleUrl = event.url.split('#')[0];
        this.articleUrl = articleUrl;
      }
    });
  }

  ngOnInit(): void {
    this.docSubscription = this.documentHtml$.subscribe((html) => {
      this.parseHtml(html);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leak
    if (this.docSubscription) {
      this.docSubscription.unsubscribe();
    }
  }

  private parseHtml(documentHtml: string): void {
    this.tocItems = []; // Clear the previous TOC items
    const parser = new DOMParser();
    const doc = parser.parseFromString(documentHtml, 'text/html');
    const headers = doc.querySelectorAll('h3');
    headers.forEach((header) => {
      const id = header.getAttribute('id');
      const text = header.textContent;
      if (id && text) {
        this.tocItems.push({ id, text });
        console.log('Added TOC item:', { id, text });
      }
    });
  }
}
