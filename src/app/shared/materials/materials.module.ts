import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [MatButtonModule],
})
export class MaterialsModule {}

@NgModule({
  exports: [MatSnackBarModule],
})
export class CoreMaterial {}

@NgModule({
  exports: [MatCardModule],
})
export class FaceRecognitionMaterials {}
