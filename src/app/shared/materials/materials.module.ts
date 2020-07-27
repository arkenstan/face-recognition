import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  exports: [MatButtonModule],
})
export class MaterialsModule {}

@NgModule({
  exports: [
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class CoreMaterial {}

@NgModule({
  exports: [MatCardModule],
})
export class FaceRecognitionMaterials {}
