import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService, private router: Router) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  
  ngOnInit() {
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.databaseService.login(this.loginForm.value).subscribe(response => {
        if(response) {
          localStorage.setItem('username', this.loginForm.value.username)
          localStorage.setItem('type', response.data.login)
          this.router.navigate(['/'])
        } else {
          alert("Error: Check console for details.")
        }
      });
    } else {
      alert("Please fill in all of the form.")
    }
  }
}
