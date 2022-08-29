import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { MenuComponent } from './components/menu/menu.component';
import { KanbanComponent } from './components/submodules/kanban/kanban.component';
import { ProjectComponent } from './components/submodules/project/project.component';
import { SprintComponent } from './components/submodules/sprints/sprint.component';
import { EffortComponent } from './components/submodules/effort/effort.component';
import { UserComponent } from './components/submodules/user/user.component';
import { GanttComponent } from './components/submodules/gantt/gantt.component';
import { IncidentComponent } from './components/submodules/incident/incident.component';
import { ActiveComponent } from './components/submodules/security/active/active.component';
import { VulnlibComponent } from './components/submodules/security/vulnlib/vulnlib.component';
import { VulnComponent } from './components/submodules/security/vuln/vuln.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: AuthComponent },
  {
    path: 'app', component: MenuComponent,
    children: [
      { path: 'projects', component: ProjectComponent },
      { path: 'effort', component: EffortComponent },
      { path: 'kanban', component: KanbanComponent },
      { path: 'user', component: UserComponent },
      { path: 'sprint', component: SprintComponent },
      { path: 'gantt', component: GanttComponent },
      { path: 'incidents', component: IncidentComponent},
      { path: 'actives', component: ActiveComponent},
      { path: 'vulnlib', component: VulnlibComponent},
      { path: 'vulns', component: VulnComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
