import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Notification } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification: Subject<Notification>;
  constructor() {
    this.notification = new Subject();
  }

  public notify(data: Notification) {
    this.notification.next(data);
  }

  public getNotification() {
    return this.notification;
  }
}
