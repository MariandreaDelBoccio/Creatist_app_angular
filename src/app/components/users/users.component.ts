import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { FollowService } from 'src/app/services/follow.service';
import { Follow } from 'src/app/models/follow';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  url: string;
  title: string;
  identity;
  token;
  page;
  next_page;
  prev_page;
  total;
  pages;
  users: User[];
  status: string;
  follows;
  followUserOver;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.title = 'Personas',
      this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;

  }

  ngOnInit() {
    console.log('personas cargado');
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      console.log(page);

      this.page = page;

      if (!params['page']) {
        page = 1;
      }

      this.next_page = page + 1;
      this.prev_page = page - 1;

      if (this.prev_page <= 0) {
        this.prev_page = 1;
      }

      this.getUsers(page);

    })
  }

  getUsers(page) {
    this._userService.getUsers(this.page).subscribe(
      response => {
        if (!response.users) {
          this.status = 'error'
        } else {
          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          this.follows = response.users_following;

          if (page > this.pages) {
            this._router.navigate(['/personas', 1])
          }
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error'
        }

      }
    )
  }

  mouseEnter(user_id) {
    this.followUserOver = user_id;
  }

  mouseLeave(user_id) {
    this.followUserOver = 0;
  }

  followUser(followed) {
    const follow = new Follow('', this.identity.user_id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if (!response.follow) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.follows.push(followed)
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error'
        }
      }
    )
  }

  unfollowUser(followed) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        const search = this.follows.indexOf(followed);

        if (search != -1) {
          this.follows.splice(search, 1);
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error'
        }
      }
    )
  }

}
