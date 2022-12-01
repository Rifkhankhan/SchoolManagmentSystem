import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher-layout',
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.css']
})
export class TeacherLayoutComponent implements OnInit {
  constructor(private authService:AuthService,private router : Router) { }
	authSub: Subscription = new Subscription();

  ngOnInit(): void {
  }

  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
