import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documentHtml = new BehaviorSubject<string>('');

  setDocumentHtml(html: string): void {
    this.documentHtml.next(html);
  }

  getDocumentHtml(): Observable<string> {
    return this.documentHtml.asObservable();
  }
}
