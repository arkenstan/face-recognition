import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './containers/app/app.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [SharedModule],
})
export class CoreModule {}
