import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JediListComponent } from './jedi-list/jedi-list.component';
import { AddJediComponent } from './add-jedi/add-jedi.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: 'heroes',
    component: JediListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: AddJediComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },{
    path: '**',
    redirectTo: 'heroes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
