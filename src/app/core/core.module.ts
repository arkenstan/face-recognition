import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreMaterial } from '../shared/materials/materials.module';

import { AppComponent } from './containers/app/app.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [SharedModule, CoreMaterial],
})
export class CoreModule {}
