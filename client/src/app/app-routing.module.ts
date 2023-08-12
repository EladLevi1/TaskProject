import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LogRegGuard } from './guard/logreg.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LogRegGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LogRegGuard] },
  { path: 'list', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'new', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: TaskFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}