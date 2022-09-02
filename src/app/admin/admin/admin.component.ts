import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: any;
  constructor() { }

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

}
