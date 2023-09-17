import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  username: string | null;
  type: string | null;
  bookings: any[] = [];

  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private databaseService: DatabaseService, 
    private router: Router) { 
      this.username = localStorage.getItem('username');
      this.type = localStorage.getItem('type');

      this.databaseService.getBookings(this.type, this.username).subscribe(response => {
        this.bookings = response.data.getBookings.filter((booking: { username: string | null; }) => booking.username === this.username)
      })
    } 

  ngOnInit(): void {
  }

}
