import { Injectable } from '@angular/core';
import { Queue } from '@shared/queue';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor() { }

  createQueue(): Queue {
    return new Queue();
  }
}
