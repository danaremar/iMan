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
import { TimeComponent } from './components/submodules/time/time.component';
import { KanbanComponent } from './components/submodules/kanban/kanban.component';
import { TeamComponent } from './components/submodules/team/team.component';
import { ConfigComponent } from './components/submodules/config/config.component';
import { ChatComponent } from './components/submodules/chat/chat.component';
import { RequirementsComponent } from './components/submodules/requirements/requirements.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SprintComponent } from './components/submodules/sprints/sprint.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AuthComponent,
    NavbarComponent,
    SidebarComponent,
    ProjectComponent,
    UserComponent,
    TimeComponent,
    KanbanComponent,
    TeamComponent,
    ConfigComponent,
    ChatComponent,
    RequirementsComponent,
    SprintComponent
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
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
