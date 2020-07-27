import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  exports: [MatButtonModule],
})
export class MaterialsModule {}

@NgModule({
  exports: [MatSnackBarModule],
})
export class CoreMaterial {}
