import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreMaterial } from '../shared/materials/materials.module';

import { AppComponent } from './containers/app/app.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, LoaderComponent],
  imports: [SharedModule, RouterModule, CoreMaterial],
  entryComponents: [LoaderComponent],
})
export class CoreModule {}
