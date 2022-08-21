import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './services/authentication/interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/menu/sidebar/sidebar.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/menu/navbar/navbar.component';
import { ProjectComponent } from './components/submodules/project/project.component';
import { UserComponent } from './components/submodules/user/user.component';
import { KanbanComponent } from './components/submodules/kanban/kanban.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SprintComponent } from './components/submodules/sprints/sprint.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EffortComponent } from './components/submodules/effort/effort.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GanttComponent } from './components/submodules/gantt/gantt.component';
import { IncidentComponent } from './components/submodules/incident/incident.component';
import { AgGridModule } from 'ag-grid-angular';
import { TaskComponent } from './components/submodules/kanban/task/task.component';
import { ActiveComponent } from './components/submodules/security/active/active.component';
import { ModalActive } from './components/submodules/security/active/modal/modal_active.component';
import { ShowUserPhoto } from './components/auxiliar/show_user/show_user.component';
import { VulnlibComponent } from './components/submodules/security/vulnlib/vulnlib.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AuthComponent,
    NavbarComponent,
    SidebarComponent,
    ProjectComponent,
    UserComponent,
    EffortComponent,
    KanbanComponent,
    SprintComponent,
    GanttComponent,
    IncidentComponent,
    TaskComponent,
    ActiveComponent,
    ModalActive,
    ShowUserPhoto,
    VulnlibComponent
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    NgbModule,
    NgxChartsModule,
    AgGridModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
