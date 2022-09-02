import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';

const PrimengComponents = [
  TableModule,
  ButtonModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  exports: [
    TableModule,
    ButtonModule
  ]
})
export class PrimengModule { }
