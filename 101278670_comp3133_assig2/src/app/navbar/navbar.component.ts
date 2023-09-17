import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean;
  isLoggedIn: boolean;
  username: string | null;

  constructor(private router: Router) {
    this.isAdmin = localStorage.getItem('type') === 'admin';
    this.isLoggedIn = localStorage.getItem('type') !== null ? true : false;
    this.username = localStorage.getItem('username')
  }

  ngOnInit(): void {
    
  }

  logout() {
    localStorage.clear();
    if (window.location.pathname === "/") window.location.reload();
  }

}
