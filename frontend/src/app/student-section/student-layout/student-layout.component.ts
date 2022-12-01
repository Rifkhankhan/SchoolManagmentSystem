import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})
export class StudentLayoutComponent implements OnInit {
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
