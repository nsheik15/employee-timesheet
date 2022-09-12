import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  userStatusList: any;
  startDate = new Date();
  endDate = new Date();
  user: any;
  spinner = false;

  constructor(private router: Router, private messageService: MessageService, private toast: ToastService, private timesheet: TimesheetService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  ngAfterViewInit() {
    this.getLoginMsg();
    this.getWarnMsg();
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

  getWarnMsg() {
    this.toast.getWarnMsg().subscribe(msg => {
      if(!!msg) {
        setTimeout(() => {
          this.messageService.add({severity: 'warn', summary: 'Warning', detail: msg, key: 'toast'});
        }, 300);
        this.toast.warn(null);
      }
    });
  }

  getUserDetails() {
    this.userService.getUser().asObservable().subscribe(user => {
      this.user = user;
    });
  }

  setStartDate(startDate: Date) {
    this.startDate = startDate;
    this.setEndDate();

    if(this.user?.role === 'admin') {
      this.getUserStatusList();
    }
  }

  setEndDate() {
    this.endDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() + 6));
  }

  getUserStatusList() {
    this.spinner = true;
    this.timesheet.getUserStatusList(this.startDate, this.endDate).subscribe({
      next: (res: any) => {
        this.spinner = false;

        if(res.status === 200) {
          this.userStatusList = res.content;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, key: 'toast' });
        }
      }, error: (err) => {
        this.spinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, key: 'toast' });
      }
    });
  }

  view(id: number){
    this.router.navigate(['timesheet', id]);
  }

}
