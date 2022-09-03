import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';

const PrimengComponents = [
  TableModule,
  ButtonModule,
  InputTextModule,
  CardModule,
  CheckboxModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengComponents
  ],
  exports: [
    PrimengComponents
  ]
})
export class PrimengModule { }
