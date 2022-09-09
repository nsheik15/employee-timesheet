import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

const PrimengComponents = [
  TableModule,
  ButtonModule,
  InputTextModule,
  CardModule,
  CheckboxModule,
  ToastModule,
  ProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengComponents
  ],
  exports: [
    PrimengComponents
  ],
  providers: [
    MessageService
  ]
})
export class PrimengModule { }
