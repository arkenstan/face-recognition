import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FaceRecognitionMaterials } from 'src/app/shared/materials/materials.module';

import { FaceRecognitionRoutingModule } from './face-recognition-routing.module';
import { MainComponent } from './containers/main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    FaceRecognitionRoutingModule,
    SharedModule,
    FaceRecognitionMaterials,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FaceRecognitionModule {}
