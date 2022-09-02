import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.products = [
      {
        emp_name: 'Andrew',
        status: 'Submitted',
      },
      {
        emp_name: 'David',
        status: 'Not submitted',
      },
      {
        emp_name: 'George',
        status: 'Rejected',
      },
    ]
  }

  view(){
    this.router.navigate(['/timesheet']);
  }

}
