import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  title: string;
  user: User;
  status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Identifícate';
    this.user = new User("", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    console.log('funciona el componente de register');

  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {

          this.status = 'success';
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);

      }
    );
  }

}
