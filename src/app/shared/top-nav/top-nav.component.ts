import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TopNavService } from 'src/app/services/top-nav.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Input('status') status = 'Not Submitted';
  @Output('dateChange') dateChangeEmitter = new EventEmitter();
  @Output('action') actionEmitter = new EventEmitter();
  startDate = new Date();
  endDate = new Date();
  currDate = new Date();
  path = '';
  user: any;

  constructor(private router: Router, private userService: UserService, private topNav: TopNavService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getDate();
    this.getPath();
  }

  getUserDetails() {
    this.userService.getUser().asObservable().subscribe(user => {
      this.user = user;
    });
  }

  getPath() {
    this.path = this.router.url.split('/')[1];
  }

  getDate() {
    this.topNav.getDate().subscribe(res => {
      if(!!res) {
        this.startDate = new Date(res.startDate);
        this.endDate = new Date(res.endDate);
        this.emitDateChange();
      } else {
        this.startDate = this.setWeekStartDate(this.currDate);
        this.endDate = this.setWeekEndDate(this.currDate);
        this.topNav.setDate({startDate: this.startDate, endDate: this.endDate});
      }
    });
  }

  emitDateChange() {
    this.dateChangeEmitter.emit(this.startDate);
  }

  setWeekStartDate(date: Date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  setWeekEndDate(date: Date) {
    var lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));
  }

  changeWeek(type: string) {
    if(type === 'prev') {
      this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() - 7));
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() - 7));
    } else if(type === 'next') {
      this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() + 7));
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() + 7));
    }
    this.topNav.setDate({startDate: this.startDate, endDate: this.endDate});
  }

}
