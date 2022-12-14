import { ExamDetailComponent } from './home/detail/exam-detail/exam-detail.component';
import { StudentDetailComponent } from './home/detail/student-detail/student-detail.component';
import { DetailComponent } from './home/detail/detail.component';
import { CourseComponent } from './student-section/course/course.component';
import { TeacherSectionComponent } from './teacher-section/teacher-section.component';
import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EditComponent } from './profile/edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'home',
		children: [
			{
				path: '',
				component: HomeComponent
				// canActivate: [AuthGuard]
			},
      {
        path:"details/:name",
        component:DetailComponent
      },
			{
				path: 'teachers',
				component: TeacherComponent
			},
			{
				path: 'students',
        children:[
          {
            path:'',
            component: StudentComponent
          },
          {
            path:'details/:studentId',
            component:StudentDetailComponent
          }
        ],
			},
			{
				path: 'exams',
        children:[
          {
            path:'',
            component: StudentComponent
          },
          {
            path:'details/:examId',
            component:ExamDetailComponent
          }
        ]
			},
			{
				path: 'courses',
				component: CourseComponent
			},


		]
		// canActivate: [AuthGuard]
	},
	{
		path: 'register',
		component: RegisterComponent
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
		// canActivate: [AuthGuard]
	},
	{
		path: 'teacher',
    loadChildren: () =>
    import('./teacher-section/teacher-section.module').then(m => m.TeacherSectionModule),
  },
	{
		path: 'student',
    loadChildren: () =>
    import('./student-section/student-section.module').then(m => m.StudentSectionModule),
  },

	{
		path: '**',
		redirectTo: 'home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
