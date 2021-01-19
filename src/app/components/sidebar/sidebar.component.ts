import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Post } from '../../models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  identity;
  token;
  stats;
  url;
  status;
  post: Post;

  constructor(
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.post = new Post('', '', '', '', this.identity._id);
  }

  ngOnInit() {
    console.log('sidebar cargado');

  }

}
