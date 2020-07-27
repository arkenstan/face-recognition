import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';

import {
  NotificationService,
  Notification,
} from '../../services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'face-recognition';
  notification$: Subject<Notification>;

  constructor(
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.notification$ = this.notificationService.getNotification();
    this.notification$.subscribe((res) => {
      this.openSnackBar(res);
    });
  }

  openSnackBar({ message, level }: Notification) {
    this._snackBar.open(message, level, { duration: 2000 });
  }
}
