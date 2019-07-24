import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Priority } from '@shared/priority';
import { Queue } from '@shared/queue';
import { QueueService } from './queue.service';

@Component({
  selector: 'courses-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueueComponent implements OnInit {
  public queueKeys = [Priority.Low, Priority.Medium, Priority.High];
  public currentQueue = Priority.Low;
  public name = 'some task';
  public queue: Queue;

  public get classNames(): string {
    return 'list-group-item';
  }

  constructor(
    private queueService: QueueService,
  ) {}

  ngOnInit() {
    this.queue = this.queueService.createQueue();
  }

  public addItemToQueue(): void {
    this.queue.push(this.name, this.currentQueue);
  }

  public removeItemFromQuery(): void {
    this.queue.pop();
  }
}
