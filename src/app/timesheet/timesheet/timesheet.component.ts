import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  startDate = new Date();
  monDate = new Date();
  tueDate = new Date();
  wedDate = new Date();
  thuDate = new Date();
  friDate = new Date();
  satDate = new Date();

  timesheetForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initTimesheetForm();
    this.onFormChange();
  }

  initTimesheetForm() {
    this.timesheetForm = this.fb.group({
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
  }

  onFormChange() {
    this.timesheetForm.valueChanges.subscribe((change) => {
      const sunTime = this.timesheetForm.get('sunTime')?.value;
      const monTime = this.timesheetForm.get('monTime')?.value;
      const tueTime = this.timesheetForm.get('tueTime')?.value;
      const wedTime = this.timesheetForm.get('wedTime')?.value;
      const thuTime = this.timesheetForm.get('thuTime')?.value;
      const friTime = this.timesheetForm.get('friTime')?.value;
      const satTime = this.timesheetForm.get('satTime')?.value;

      const sunTimeArr = sunTime.split(':');
      const monTimeArr = monTime.split(':');
      const tueTimeArr = tueTime.split(':');
      const wedTimeArr = wedTime.split(':');
      const thuTimeArr = thuTime.split(':');
      const friTimeArr = friTime.split(':');
      const satTimeArr = satTime.split(':');

      const sunTimeHours = sunTimeArr[0] ? sunTimeArr[0] : 0;
      const monTimeHours = monTimeArr[0] ? monTimeArr[0] : 0;
      const tueTimeHours = tueTimeArr[0] ? tueTimeArr[0] : 0;
      const wedTimeHours = wedTimeArr[0] ? wedTimeArr[0] : 0;
      const thuTimeHours = thuTimeArr[0] ? thuTimeArr[0] : 0;
      const friTimeHours = friTimeArr[0] ? friTimeArr[0] : 0;
      const satTimeHours = satTimeArr[0] ? satTimeArr[0] : 0;

      const sunTimeMin = sunTimeArr[1] ? sunTimeArr[1] : 0;
      const monTimeMin = monTimeArr[1] ? monTimeArr[1] : 0;
      const tueTimeMin = tueTimeArr[1] ? tueTimeArr[1] : 0;
      const wedTimeMin = wedTimeArr[1] ? wedTimeArr[1] : 0;
      const thuTimeMin = thuTimeArr[1] ? thuTimeArr[1] : 0;
      const friTimeMin = friTimeArr[1] ? friTimeArr[1] : 0;
      const satTimeMin = satTimeArr[1] ? satTimeArr[1] : 0;

      const totalHours = Number(sunTimeHours) + Number(monTimeHours) + Number(tueTimeHours) + Number(wedTimeHours) + Number(thuTimeHours) + Number(friTimeHours) + Number(satTimeHours);
      const totalMinutes = Number(sunTimeMin) + Number(monTimeMin) + Number(tueTimeMin) + Number(wedTimeMin) + Number(thuTimeMin) + Number(friTimeMin) + Number(satTimeMin);

      const minToHours = totalMinutes / 60;
      const minHours = Math.floor(minToHours);
      const minMins = totalMinutes - (minHours * 60);

      const totalTime = `${(totalHours + minHours).toString().length === 1 ? '0' + (totalHours + minHours) : totalHours + minHours}:${(minMins.toString().length === 1 ? '0' + minMins : minMins)}`;

      this.timesheetForm.get('totalTime')?.setValue(totalTime, { emitEvent: false });
    });
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

}
