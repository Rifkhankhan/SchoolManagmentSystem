import { AuthService } from './../Services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService:AuthService,private router : Router) { }


  ngOnInit(): void {
  }
  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
