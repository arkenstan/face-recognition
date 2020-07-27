import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { NotificationService } from 'src/app/core/services/notification.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Notification, LoaderData } from 'src/app/core/models';
import { LoaderComponent } from 'src/app/core/components/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'face-recognition';
  notification$: Subject<Notification>;
  loader$: Subject<LoaderData>;
  dialogRef: MatDialogRef<LoaderComponent>;

  constructor(
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    public _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {
    this.notification$ = this.notificationService.getNotification();
    this.loader$ = this.loaderService.getData();
  }

  ngOnInit(): void {
    this.notification$.subscribe((res) => {
      this.openSnackBar(res);
    });
    this.loader$.subscribe((res) => {
      if (res.action === 'open') {
        this.dialogRef = this._dialog.open(LoaderComponent, {
          disableClose: true,
          data: {
            message: res.message,
          },
        });
      } else {
        this.dialogRef.close();
      }
    });
  }

  openSnackBar({ message, level }: Notification) {
    this._snackBar.open(message, level, { duration: 2000 });
  }
}
