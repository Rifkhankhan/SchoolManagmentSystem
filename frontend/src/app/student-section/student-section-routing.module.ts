import { CourseComponent } from './course/course.component';
import { ExamComponent } from './exam/exam.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EditComponent } from './profile/edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'teachers',
				children: [
					{
						path: '',
						component: TeacherComponent
					},
					{
						path: 'teacher/:teacherId',
						component: TeacherComponent
					}
				]
			},
			{
				path: 'exams',
				children: [
					{
						path: '',
						component: ExamComponent
					},
					{
						path: 'exams/:examId',
						component: StudentComponent
					}
				]
			},
			{
				path: 'courses',
				children: [
					{
						path: '',
						component: CourseComponent
					},
					{
						path: 'courses/:courseId',
						component: CourseComponent
					}
				]
			},
			{
				path: 'profile',
				children: [
					{
						path: '',
						children: [
							{
								path: '',
								component: ProfileComponent
								// canActivate: [AuthGuard]
							},
							{
								path: 'edit',
								component: EditComponent
								// canActivate: [AuthGuard]
							},
							{
								path: 'change',
								component: ChangePasswordComponent
								// canActivate: [AuthGuard]
							}
						]
					}
				]
			}
		]
	},
	{
		path: '**',
		redirectTo: '/student/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StudentSectionRoutingModule {}
