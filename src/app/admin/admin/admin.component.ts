import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  products: any;
  constructor(private router: Router, private messageService: MessageService, private toast: ToastService) { }

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

  ngAfterViewInit() {
    this.getLoginMsg();
  }

  getLoginMsg() {
    this.toast.getLoginMsg().subscribe(msg => {
      if(!!msg) {
        setTimeout(() => {
          this.messageService.add({severity:'success', summary:'Success', detail: msg, key: 'toast'});
        }, 300);
        this.toast.login(null);
      }
    });
  }

  view(id: number){
    this.router.navigate(['timesheet', id]);
  }

}
