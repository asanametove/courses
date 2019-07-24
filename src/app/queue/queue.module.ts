import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueComponent } from './queue.component';
import { FormsModule } from '@angular/forms';
import { QueueService } from './queue.service';

@NgModule({
  declarations: [QueueComponent],
  providers: [QueueService],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class QueueModule { }
