import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './Staff/teacher/teacher.component';
import { ManagementComponent } from './Staff/management/management.component';
import { AuthComponent } from './auth/auth.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { StudentMenuComponent } from './Components/student-menu/student-menu.component';
import { TeacherMenubarComponent } from './Components/teacher-menubar/teacher-menubar.component';
import { ManagementMenubarComponent } from './Components/management-menubar/management-menubar.component';
import { MenubarComponent } from './Components/menubar/menubar.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    StudentComponent,
    TeacherComponent,
    ManagementComponent,
    AuthComponent,
    SidebarComponent,
    FooterComponent,
    StudentMenuComponent,
    TeacherMenubarComponent,
    ManagementMenubarComponent,
    MenubarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
