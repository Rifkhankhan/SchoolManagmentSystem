import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './profile/edit/edit.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StaffComponent } from './staff/staff.component';
import { TeacherLayoutComponent } from './teacher-layout/teacher-layout.component';
import { StudentComponent } from './student/student.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherSectionRoutingModule } from './teacher-section-routing.module';
import { TeacherSectionComponent } from './teacher-section.component';
import { TeacherSidebarComponent } from "./teacher-sidebar/teacher-sidebar.component";
import { CourseComponent } from './course/course.component';
import { ExamComponent } from './exam/exam.component';


@NgModule({
    declarations: [
        StudentComponent,
        TeacherLayoutComponent,
        TeacherSectionComponent,
        TeacherSidebarComponent,
        StaffComponent,
        TeacherComponent,
        ProfileComponent,
        HomeComponent,
        CourseComponent,
        ExamComponent,
        ChangePasswordComponent,
        EditComponent,
        

    ],
    imports: [
        CommonModule,
        TeacherSectionRoutingModule,
        FormsModule,ReactiveFormsModule
    ]
})
export class TeacherSectionModule { }


// ng g module teacher-section --routing
