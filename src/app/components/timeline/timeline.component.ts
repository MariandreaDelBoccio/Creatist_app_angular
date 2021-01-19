import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { PostService } from '../../services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  identity;
  token;
  url: string;
  status: string;
  page;
  pages;
  itemsxPage;
  total;
  posts: Post[];
  user;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;
    this.page = 1;
  }

  ngOnInit() {
    // console.log('timeline cargado');
    this.getPosts(this.page);
  }

  getPosts(page, adding = false) {
    this._postService.getPosts(this.token, page).subscribe(
      response => {
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
