import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/users';
import { Follow } from 'src/app/models/follow';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  url: string;
  user: User;
  status: string;
  identity;
  token;
  stats;
  followed;
  following;
  total;
  pages;
  itemsxPage;
  posts: Post[];
  page;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _followService: FollowService,
    private _postService: PostService
  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();
    this.followed = false;
    this.following = false;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.loadPage();
      this.getPosts(id, this.page);
      console.log(id);

    })
    // this.getPosts(this.user, this.page);
  }

  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);
    })
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        // console.log(response);
        if (response.user) {
          this.user = response.user;

          if (response.following && response.following._id) {
            this.following = true;
          } else {
            this.following = false;
          }

          if (response.followed && response.followed._id) {
            this.followed = true;
          } else {
            this.followed = false;
          }

        } else {
          this.status = 'error';
          this._router.navigate(['/perfil', this.identity._id])
        }

      },
      error => {
        console.log(<any>error);

      }
    )
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      response => {
        this.stats = response;

      },
      error => {
        console.log(<any>error);

      }
    )
  }

  followUser(followed) {
    let follow = new Follow('', this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        this.following = true;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  unfollowUser(following) {
    this._followService.deleteFollow(this.token, following).subscribe(
      response => {
        this.following = false;
      },
      error => {
        console.log(<any>error);

      }
    )
  }

  getPosts(user_id, page, adding = false) {

    this._postService.getPostsUser(this.token, user_id, page).subscribe(
      response => {
        console.log(response);

        if (response.posts) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsxPage = response.itemsxPage;
          // this.posts = response.posts;

          if (!adding) {
            this.posts = response.posts;
          } else {
            let arrayA = this.posts;
            let arrayB = response.posts;
            this.posts = arrayA.concat(arrayB);

            // $("html, body").animate({ scrollTop: $('body').prop('scrollHeight') }, 500);
          }

          if (page > this.page) {
            this._router.navigate(['/home']);
          }
        } else {
          this.status = 'error';
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