import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FaceapiService } from '../../services/faceapi.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  imageForm = this.fb.group({
    idCardImage: [null],
    profileImage: [null],
  });

  uiState = {
    idInputDisabled: true,
    profileInputDisabled: true,
  };

  images = {
    identity: null,
    profile: null,
  };
  likeness: number = null;

  constructor(
    private fb: FormBuilder,
    private faceApi: FaceapiService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loaderService.openLoader('Loading models');
    await this.faceApi.loadModels();
    this.loaderService.closeLoader();
  }

  readFile(file: File) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return reader;
  }

  idCardImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let reader = this.readFile(file);
      reader.onload = async (_event) => {
        let result = reader.result.toString();
        this.loaderService.openLoader('Detecting Face');
        let success = await this.faceApi.calculateIdentityDescriptor(result);
        this.images.identity = result;
        this.loaderService.closeLoader();
      };
    } else {
      this.notificationService.notify({
        message: 'Unable to get a file',
        level: 'error',
      });
    }
  }

  profileImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let reader = this.readFile(file);
      reader.onload = async (_event) => {
        let result = reader.result.toString();
        this.loaderService.openLoader('Detecting Face');
        let success = await this.faceApi.calculateProfileDescriptor(result);
        if (success) {
          this.images.profile = result;
          this.getLikeness();
        }
        this.loaderService.closeLoader();
      };
    } else {
      this.notificationService.notify({
        message: 'Unable to get a file',
        level: 'error',
      });
    }
  }

  async getLikeness() {
    this.likeness = await this.faceApi.computeLikeness();
  }
}
