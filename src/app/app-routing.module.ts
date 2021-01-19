import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { UserGuard } from './services/user.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'configuracion', component: UserEditComponent, canActivate: [UserGuard] },
  { path: 'personas', component: UsersComponent, canActivate: [UserGuard] },
  { path: 'personas/:page', component: UsersComponent, canActivate: [UserGuard] },
  { path: 'timeline', component: TimelineComponent, canActivate: [UserGuard] },
  { path: 'add-post', component: AddPostComponent },
  { path: 'perfil/:id', component: ProfileComponent, canActivate: [UserGuard] },
  { path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate: [UserGuard] },
  { path: '**', component: HomeComponent } /** crear una pag 404 */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
