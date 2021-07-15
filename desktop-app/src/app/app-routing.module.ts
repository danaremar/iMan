import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {path: '' , component: AppComponent},
  {path: 'login' , component: AuthComponent},
  {path: 'index' , component: IndexComponent},

  // TODO:
  {path: 'time' , component: IndexComponent},
  {path: 'kanban' , component: IndexComponent},
  {path: 'chat' , component: IndexComponent},
  {path: 'requirements' , component: IndexComponent},
  {path: 'team' , component: IndexComponent},
  {path: 'projects' , component: IndexComponent},
  {path: 'user' , component: IndexComponent},
  {path: 'config' , component: IndexComponent},
  {path: 'logout' , component: IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
