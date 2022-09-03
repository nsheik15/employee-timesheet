import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

const PrimengComponents = [
  TableModule,
  ButtonModule,
  InputTextModule
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
