import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-teacher-sidebar',
  templateUrl: './teacher-sidebar.component.html',
  styleUrls: ['./teacher-sidebar.component.css']
})
export class TeacherSidebarComponent implements OnInit {

  constructor(private authService:AuthService,private router : Router) { }


  ngOnInit(): void {
  }
  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
