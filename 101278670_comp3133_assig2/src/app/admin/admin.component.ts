import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  createListingForm: FormGroup;
  listings: any[] = [];

  constructor(private router: Router, private fb: FormBuilder, private databaseService: DatabaseService) { 
    this.createListingForm = this.fb.group({
      listing_id: ['', Validators.required],
      listing_title: ['', Validators.required],
      description: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      price:  ['', Validators.required],
      email: ['', Validators.required],
      username: localStorage.getItem('username'),
      type: localStorage.getItem('type')
    });
  }

  onSubmitCreateListingForm() {
    if(this.createListingForm.valid) {
      this.databaseService.createListing(this.createListingForm.value).subscribe(response => {
        alert(`Listing succesfully created!`)
        this.createListingForm.reset()
        this.getListings()
      });
    } else {
      alert("Please fill in all of the form.")
    }
  }

  ngOnInit(): void {
    if(!(localStorage.getItem('type') == 'admin')) {
      alert("You are not an admin!")
      this.router.navigate(['/login'])
    }
    this.getListings()
  }

  getListings() {
    this.databaseService.getListings().subscribe(response => {
      this.listings = response.data.getListings
    })
  }
}
