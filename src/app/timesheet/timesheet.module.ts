import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TimesheetComponent
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    SharedModule
  ]
})
export class TimesheetModule { }
