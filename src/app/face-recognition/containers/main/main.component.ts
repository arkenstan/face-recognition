import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FaceapiService } from '../../services/faceapi.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('idImage') idImage: ElementRef<HTMLInputElement>;
  @ViewChild('profileImage') profileImage: ElementRef<HTMLInputElement>;

  imageForm = this.fb.group({
    idCardImage: [null],
    profileImage: [null],
  });

  images = {
    identity: null,
    profile: null,
  };
  likeness: number = null;

  constructor(
    private fb: FormBuilder,
    private faceApi: FaceapiService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.faceApi.loadModels();
    console.log('Models loaded');
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
        let success = await this.faceApi.calculateIdentityDescriptor(result);
        this.images.identity = result;
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
        let success = await this.faceApi.calculateProfileDescriptor(result);
        if (success) {
          this.images.profile = result;
          this.getLikeness();
        }
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
