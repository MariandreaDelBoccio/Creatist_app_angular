import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  title: string;
  user: User;
  status: string;
  identity;
  token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Identifícate';
    this.user = new User("", "", "", "", "", "", "", "")
  }

  ngOnInit(): void {
    console.log('funciona el componente de login');

  }

  onSubmit() {
    this._userService.signUp(this.user).subscribe(
      response => {
        this.identity = response.user;
        console.log(this.identity);
        if (!this.identity || !this.identity._id) {
          this.status = 'error';
        } else {
          localStorage.setItem('Identity', JSON.stringify(this.identity));

          this.gettoken();
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error'
        }
      }
    );

  }

  gettoken() {
    this._userService.signUp(this.user, 'true').subscribe(
      response => {
        this.token = response.token;
        console.log(this.token);
        if (this.token.length <= 0) {
          this.status = 'error';
        } else {
          localStorage.setItem('Token', this.token);

          this.getCounters();

        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error'
        }
      }
    );
  }

  getCounters() {
    this._userService.getCounters().subscribe(
      response => {
        // if (response.following.length <= 0)
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/']);
      },
      error => {
        console.log(<any>error);

      }
    )
  }

}
