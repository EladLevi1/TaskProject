import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { TaskNewComponent } from './components/task-new/task-new.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'new', component: TaskNewComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}