import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addFollow(token, follow): Observable<any> {
    const params = JSON.stringify(follow);
    const headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);

    return this._http.post(this.url + 'follow', params, { headers: headers })
  }

  deleteFollow(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);

    return this._http.delete(this.url + 'follow/' + id, { headers: headers });
  }

  getFollowing(token, userId = null, page = 1): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);

    let url = this.url + 'following/';
    if (userId != null) {
      url = this.url + 'following/' + userId + '/' + page;
    }
    return this._http.get(url, { headers: headers })
  }
}
