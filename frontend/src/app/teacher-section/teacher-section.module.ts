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


@NgModule({
    declarations: [
        StudentComponent,
        TeacherLayoutComponent,
        TeacherSectionComponent,
        TeacherSidebarComponent,
        StaffComponent,
        TeacherComponent,
        ProfileComponent,
        HomeComponent

    ],
    imports: [
        CommonModule,
        TeacherSectionRoutingModule,
    ]
})
export class TeacherSectionModule { }
