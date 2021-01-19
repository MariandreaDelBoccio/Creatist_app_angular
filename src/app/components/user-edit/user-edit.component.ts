import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title: string;
  user: User;
  identity;
  token;
  status: string;
  url: string;

  constructor(
    private _route: ActivatedRoute, _router: Router, private _userService: UserService, private _uploadService: UploadService
  ) {
    this.title = 'Actualizar mis datos';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log(this.user);
  }

  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('Identity', JSON.stringify(this.user));
          this.identity = this.user;

          this._uploadService.fileReq(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.user.image = result.user.image;
              localStorage.setItem('Identity', JSON.stringify(this.user));
            })
        }
      },
      error => {
        let errMessage = <any>error;
        console.log(errMessage);

        if (errMessage != null) {
          this.status = 'error';
        }

      }
    );
  }

  filesToUpload: Array<File>;
  fileChange(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
