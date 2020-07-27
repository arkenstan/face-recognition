import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  NotificationService,
  Notification,
} from '../../services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'face-recognition';
  notification$: Observable<Notification>;

  constructor(
    private notification: NotificationService,
    private _snackBar: MatSnackBar
  ) {
    this.notification$.subscribe((res) => {
      this.openSnackBar(res);
    });
  }

  openSnackBar({ message, level }: Notification) {
    this._snackBar.open(message, level, { duration: 2000 });
  }
}
