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
        id: 1,
        emp_name: 'Andrew',
        status: 'Submitted',
      },
      {
        id: 2,
        emp_name: 'David',
        status: 'Not submitted',
      },
      {
        id: 3,
        emp_name: 'George',
        status: 'Rejected',
      },
    ]
  }

  view(id: number){
    this.router.navigate(['timesheet', id]);
  }

}
