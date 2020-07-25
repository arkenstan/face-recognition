import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { FaceRecognitionRoutingModule } from './face-recognition-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, FaceRecognitionRoutingModule],
})
export class FaceRecognitionModule {}
