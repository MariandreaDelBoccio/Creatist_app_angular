import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addPost(token, post): Observable<any> {
    const params = JSON.stringify(post);

    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.post(this.url + 'post', params, { headers: headers });
  }

  getPosts(token, page = 1): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.get(this.url + 'posts/' + page, { headers: headers })
  }

  getPostsUser(token, user_id, page = 1): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.get(this.url + 'posts-user/' + user_id + '/' + page, { headers: headers })
  }

  removePost(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.delete(this.url + 'post/' + id, { headers: headers });
  }


}
