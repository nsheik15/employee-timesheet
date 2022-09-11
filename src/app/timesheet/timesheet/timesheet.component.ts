import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit, AfterViewInit {

  startDate = new Date();
  monDate = new Date();
  tueDate = new Date();
  wedDate = new Date();
  thuDate = new Date();
  friDate = new Date();
  satDate = new Date();
  user: any;
  totalHours = 0;
  totalMinutes = 0;
  totalPerDay: any = {
    sunTime: '00:00',
    monTime: '00:00',
    tueTime: '00:00',
    wedTime: '00:00',
    thuTime: '00:00',
    friTime: '00:00',
    satTime: '00:00'
  };
  grandTotal = '00:00';

  timesheetForm!: FormGroup;

  get timesheetArr() {
    return (<FormArray>this.timesheetForm.get('timesheetArr')).controls;
  }

  constructor(private fb: FormBuilder, private messageService: MessageService, private toast: ToastService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.initTimesheetForm();
    this.onFormChange();
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

  getUserDetails() {
    this.userService.getUser().asObservable().subscribe(user => {
      this.user = user;
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

  initTimesheetForm() {
    this.timesheetForm = this.fb.group({
      timesheetArr: this.fb.array([this.initTimesheetArr()])
    });
  }

  initTimesheetArr() {
    const timesheetForm = this.fb.group({
      project: ['', [Validators.required]],
      task: ['', [Validators.required]],
      sunTime: ['00:00', [Validators.required]],
      monTime: ['00:00', [Validators.required]],
      tueTime: ['00:00', [Validators.required]],
      wedTime: ['00:00', [Validators.required]],
      thuTime: ['00:00', [Validators.required]],
      friTime: ['00:00', [Validators.required]],
      satTime: ['00:00', [Validators.required]],
      totalTime: [{value: '00:00', disabled: true}]
    });

    return timesheetForm;
  }

  addRow() {
    const controls = <FormArray>this.timesheetForm.get('timesheetArr');
    controls.push(this.initTimesheetArr());
  }

  removeRow(i: number) {
    const controls = this.timesheetArr;
    controls.splice(i, 1);
    this.startCalc();
  }

  onFormChange() {
    this.timesheetForm.valueChanges.subscribe((change) => {
      this.startCalc();
    });
  }

  startCalc() {
    const timesheetArr = this.timesheetArr;
    const totalControls = ['sunTime', 'monTime', 'tueTime', 'wedTime', 'thuTime', 'friTime', 'satTime'];

    for(let controls of timesheetArr) {
      const totalTime = this.calculateTotal(controls, totalControls);
      controls.get('totalTime')?.setValue(totalTime, { emitEvent: false });
    }

    this.calcTotalPerDay(totalControls, timesheetArr);
    this.calcGrandTotal(totalControls);
  }

  calculateTotal(controls: any, totalControls: any) {
    this.totalHours = 0;
    this.totalMinutes = 0;

    totalControls.forEach((totalControl: string) => {
      const time = controls.get(totalControl)?.value;
      this.calcTotalHoursMins(time);
    });

    const totalTime = this.calcTotalTime(this.totalHours, this.totalMinutes);
    return totalTime;
  }

  calcTotalPerDay(totalControls: any, timesheetArr: any) {
    for(let totalControl of totalControls) {
      this.totalHours = 0;
      this.totalMinutes = 0;

      for(let controls of timesheetArr) {
        const time = controls.get(totalControl)?.value;
        this.calcTotalHoursMins(time);
      }

      const totalTime = this.calcTotalTime(this.totalHours, this.totalMinutes);
      this.totalPerDay[totalControl] = totalTime;
    }
  }

  calcGrandTotal(totalControls: any) {
    this.grandTotal = '00:00';
    this.totalHours = 0;
    this.totalMinutes = 0;

    for(let controls of totalControls) {
      const time = this.totalPerDay[controls];
      this.calcTotalHoursMins(time);
    }

    this.grandTotal = this.calcTotalTime(this.totalHours, this.totalMinutes);
  }

  calcTotalHoursMins(time: any) {
    const timeArr = time.split(':');
    const timeHours = timeArr[0] ? timeArr[0] : 0;
    const timeMin = timeArr[1] ? timeArr[1] : 0;

    this.totalHours += Number(timeHours);
    this.totalMinutes += Number(timeMin);
  }

  calcTotalTime(totalHours: number, totalMinutes: number) {
    const minToHours = totalMinutes / 60;
    const minHours = Math.floor(minToHours);
    const minMins = totalMinutes - (minHours * 60);

    const totalTime = `${(totalHours + minHours).toString().length === 1 ? '0' + (totalHours + minHours) : totalHours + minHours}:${(minMins.toString().length === 1 ? '0' + minMins : minMins)}`;
    return totalTime;
  }

  setStartDate(startDate: Date) {
    this.startDate = startDate;
    this.setWeekDates();
  }

  setWeekDates() {
    this.monDate = new Date(this.startDate);
    this.tueDate = new Date(this.startDate);
    this.wedDate = new Date(this.startDate);
    this.thuDate = new Date(this.startDate);
    this.friDate = new Date(this.startDate);
    this.satDate = new Date(this.startDate);
    this.monDate.setDate(this.startDate.getDate() + 1);
    this.tueDate.setDate(this.monDate.getDate() + 1);
    this.wedDate.setDate(this.tueDate.getDate() + 1);
    this.thuDate.setDate(this.wedDate.getDate() + 1);
    this.friDate.setDate(this.thuDate.getDate() + 1);
    this.satDate.setDate(this.friDate.getDate() + 1);
  }

  getAction(event: string) {
    if(event === 'submit') {
      this.submit();
    }
  }

  submit() {
    let payload = {
      ...this.timesheetForm.value,
      startDate: this.startDate,
      endDate: this.satDate
    };
    console.log(payload);
  }

}
