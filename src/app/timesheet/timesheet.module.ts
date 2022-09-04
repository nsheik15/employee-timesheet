import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TimesheetComponent
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    SharedModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class TimesheetModule { }
