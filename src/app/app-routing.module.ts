import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './core/containers/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'face-recognition', pathMatch: 'full' },
  {
    path: 'face-recognition',
    loadChildren: () =>
      import('./face-recognition/face-recognition.module').then(
        (m) => m.FaceRecognitionModule
      ),
  },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
