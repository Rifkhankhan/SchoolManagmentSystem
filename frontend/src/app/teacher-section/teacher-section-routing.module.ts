import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/teacher/home',
		pathMatch: 'full'
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

		]
		// canActivate: [AuthGuard]
	},
	{
		path: '**',
		redirectTo: '/teacher/home',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherSectionRoutingModule { }
