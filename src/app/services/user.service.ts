import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  identity;
  token;
  stats;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post(this.url + 'register', params, { headers: headers })
  }

  signUp(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = gettoken;
    }

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('Identity'));

    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  gettoken() {
    let token = localStorage.getItem('Token');

    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  getStats() {
    let stats = JSON.parse(localStorage.getItem('stats'));

    if (stats != 'undefined') {
      this.stats = stats;
    } else {
      this.stats = null;
    }
    return this.stats;
  }

  getCounters(userId = null): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.gettoken());
    if (userId != null) {
      console.log(userId);
      return this._http.get(this.url + 'counters/' + userId, { headers: headers });
    } else {
      return this._http.get(this.url + 'counters', { headers: headers });
    }
  }

  updateUser(user: User): Observable<any> {
    let params = JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', this.gettoken());

    return this._http.put(this.url + 'update-user/' + user._id, params, { headers: headers });
  }

  getUsers(page = null): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', this.gettoken());

    return this._http.get(this.url + 'users/' + page, { headers: headers });
  }

  getUser(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', this.gettoken());

    return this._http.get(this.url + 'user/' + id, { headers: headers });
  }

}
