import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[]
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService, private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.databaseService.signUp(this.registerForm.value).subscribe(data => {
        if(data.data) {
          this.router.navigate(['/login'])
        } else {
          alert("Error: Check console for details.")
        }
      });
    } else {
      console.log(this.registerForm);
      alert("Please fill in all of the form.")
    }
  }
}
