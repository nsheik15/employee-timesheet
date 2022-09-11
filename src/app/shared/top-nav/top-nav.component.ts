import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Output('dateChange') dateChangeEmitter = new EventEmitter();
  @Output('action') actionEmitter = new EventEmitter();
  startDate = new Date();
  endDate = new Date();
  currDate = new Date();
  path = '';
  user: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.startDate = this.setWeekStartDate(this.currDate);
    this.endDate = this.setWeekEndDate(this.currDate);
    this.emitDateChange();
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
    this.emitDateChange();
  }

}
