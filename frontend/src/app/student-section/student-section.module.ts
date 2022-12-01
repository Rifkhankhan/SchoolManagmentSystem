import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { StudentComponent } from './student/student.component';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './profile/edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { TeacherComponent } from './teacher/teacher.component';

import { StudentSectionRoutingModule } from './student-section-routing.module';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component';
import { ExamComponent } from './exam/exam.component';
import { CourseComponent } from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    ChangePasswordComponent,
    EditComponent,
    ProfileComponent,
    TeacherComponent,
    StudentLayoutComponent,
    StudentSidebarComponent,
    StudentComponent,
    ExamComponent,
    CourseComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    StudentSectionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentSectionModule { }
