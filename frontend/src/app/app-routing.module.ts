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
				path: 'teachers',
				component: TeacherComponent
			},
			{
				path: 'students',
				component: StudentComponent
			},
			{
				path: 'exams',
				component: StudentComponent
			},
			{
				path: 'staffs',
				component: StaffComponent
			},
			{
				path: 'profile',
				component: ProfileComponent
			}
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
    path:'teacher',
    children:[
      {
        path:'',
        component:TeacherSectionComponent
      }
    ]
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
