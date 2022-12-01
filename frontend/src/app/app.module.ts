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
import { DetailComponent } from './home/detail/detail.component';

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
    DetailComponent

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

	]
})
export class AppModule {}
