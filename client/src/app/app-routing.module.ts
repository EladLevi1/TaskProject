import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MissionListComponent } from './components/mission-list/mission-list.component';
import { MissionNewComponent } from './components/mission-new/mission-new.component';
import { MissionComponent } from './components/mission/mission.component';
import { MissionEditComponent } from './components/mission-edit/mission-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: MissionListComponent },
  { path: 'mission', component: MissionComponent },
  { path: 'new', component: MissionNewComponent },
  { path: 'edit', component: MissionEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}