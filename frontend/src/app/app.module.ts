import { TeacherSectionModule } from './teacher-section/teacher-section.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentSectionComponent } from './student-section/student-section.component';
import { StaffSectionComponent } from './staff-section/staff-section.component';
import { StudentLayoutComponent } from './student-section/student-layout/student-layout.component';
import { StaffLayoutComponent } from './staff-section/staff-layout/staff-layout.component';
import { StaffSidebarComponent } from './staff-section/staff-sidebar/staff-sidebar.component';
import { StudentSidebarComponent } from './student-section/student-sidebar/student-sidebar.component';
@NgModule({
	declarations: [
		AppComponent,
		StudentComponent,
		TeacherComponent,
		RegisterComponent,
		LoginComponent,
		SidebarComponent,
		HomeComponent,
		LayoutComponent,
		ChangePasswordComponent,
    StaffComponent,
    StudentSectionComponent,
    StaffSectionComponent,
    StudentLayoutComponent,
    StaffLayoutComponent,
    StaffSidebarComponent,
    StudentSidebarComponent
	],
	providers: [],
	bootstrap: [AppComponent],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
    TeacherSectionModule,
	]
})
export class AppModule {}
