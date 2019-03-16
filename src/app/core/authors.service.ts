import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authors } from '@shared/api';

@Injectable()
export class AuthorsService {

  constructor(
    private http: HttpClient,
  ) { }

  getAuthors() {
    return this.http.get(authors);
  }
}
