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
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TooltipModule} from 'primeng/tooltip';

const PrimengComponents = [
  TableModule,
  ButtonModule,
  InputTextModule,
  CardModule,
  CheckboxModule,
  ToastModule,
  ProgressSpinnerModule,
  AutoCompleteModule,
  MessagesModule,
  MessageModule,
  TooltipModule
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
