import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  level: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification: Subject<Notification>;
  constructor() {}

  notify(data: Notification) {
    this.notification.next(data);
  }

  getNotification() {
    return this.notification;
  }
}
