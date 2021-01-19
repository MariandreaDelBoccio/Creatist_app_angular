import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Post } from '../../models/post';
import { PostService } from 'src/app/services/post.service';
import { UploadService } from 'src/app/services/upload.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  identity;
  token;
  stats;
  url;
  status;
  post: Post;
  user: User;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uploadService: UploadService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.post = new Post('', '', '', '', this.identity._id);
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._postService.addPost(this.token, this.post).subscribe(
      response => {
        if (response.post) {
          this.status = 'success';
          form.reset();
          this._router.navigate(['/timeline']);
          localStorage.setItem('Post', JSON.stringify(this.post));

          this._uploadService.fileReq(this.url + 'upload-image-post/' + this.user._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              console.log(result);

              this.post.file = result.post.file;
              localStorage.setItem('Post', JSON.stringify(this.post));
            })
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

  filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}