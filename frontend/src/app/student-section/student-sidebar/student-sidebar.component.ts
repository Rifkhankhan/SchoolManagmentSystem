import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css']
})
export class StudentSidebarComponent implements OnInit {
  constructor(private authService:AuthService,private router : Router) { }


  ngOnInit(): void {
  }
  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
