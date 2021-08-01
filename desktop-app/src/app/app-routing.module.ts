import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatComponent } from './components/submodules/chat/chat.component';
import { ConfigComponent } from './components/submodules/config/config.component';
import { KanbanComponent } from './components/submodules/kanban/kanban.component';
import { ProjectComponent } from './components/submodules/project/project.component';
import { RequirementsComponent } from './components/submodules/requirements/requirements.component';
import { SprintComponent } from './components/submodules/sprints/sprint.component';
import { TeamComponent } from './components/submodules/team/team.component';
import { TimeComponent } from './components/submodules/time/time.component';
import { UserComponent } from './components/submodules/user/user.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: AuthComponent },
  {
    path: 'app', component: MenuComponent,
    children: [
      { path: 'projects', component: ProjectComponent },
      { path: 'time', component: TimeComponent },
      { path: 'kanban', component: KanbanComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'requirements', component: RequirementsComponent },
      { path: 'team', component: TeamComponent },
      { path: 'user', component: UserComponent },
      { path: 'config', component: ConfigComponent },
      { path: 'sprint', component: SprintComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
