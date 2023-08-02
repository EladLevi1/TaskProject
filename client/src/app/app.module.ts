import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MissionComponent } from './components/mission/mission.component';
import { MissionListComponent } from './components/mission-list/mission-list.component';
import { MissionNewComponent } from './components/mission-new/mission-new.component';
import { MissionEditComponent } from './components/mission-edit/mission-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MissionComponent,
    MissionListComponent,
    MissionNewComponent,
    MissionEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
