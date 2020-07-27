import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderData } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  data: Subject<LoaderData>;
  constructor() {
    this.data = new Subject();
  }

  openLoader(message) {
    this.data.next({ action: 'open', message });
  }

  closeLoader() {
    this.data.next({ action: 'close' });
  }

  getData() {
    return this.data;
  }
}
