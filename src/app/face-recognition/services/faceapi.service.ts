import { Injectable } from '@angular/core';
import * as faceApi from 'face-api.js';

import { NotificationService } from 'src/app/core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class FaceapiService {
  private _faceApi = faceApi;
  private weightURI = '/assets/weights';

  private identityCardDescriptor: Float32Array | number[];
  private selfieDescriptor: any;

  inputSize = 512;
  scoreThreshold = 0.5;

  constructor(private notificationService: NotificationService) {}

  async loadModels() {
    await this._faceApi.loadFaceLandmarkModel(this.weightURI);
    await this._faceApi.loadFaceRecognitionModel(this.weightURI);
    await this._faceApi.nets.tinyFaceDetector.load(this.weightURI);
  }

  async fetchImage(input) {
    return await this._faceApi.fetchImage(input);
  }

  async detectFaces(input: string) {
    let faceApiInput = await this.fetchImage(input);
    let faceDetectorOptions = new this._faceApi.TinyFaceDetectorOptions({
      inputSize: this.inputSize,
      scoreThreshold: this.scoreThreshold,
    });
    let result = await this._faceApi
      .detectAllFaces(faceApiInput, faceDetectorOptions)
      .withFaceLandmarks()
      .withFaceDescriptors();
    return result;
  }

  async calculateIdentityDescriptor(input: string) {
    let faces = await this.detectFaces(input);
    let isSuccess = false;
    if (faces && faces.length > 0) {
      this.identityCardDescriptor = faces[0].descriptor;
      isSuccess = true;
    } else {
      this.notificationService.notify({
        message: 'No Face detected. Please use a better image',
        level: 'error',
      });
      isSuccess = false;
    }
    return isSuccess;
  }

  async calculateProfileDescriptor(input: string) {
    let faces = await this.detectFaces(input);
    let isSuccess = false;
    if (faces && faces.length > 0) {
      this.selfieDescriptor = faces[0].descriptor;
      isSuccess = true;
    } else {
      this.notificationService.notify({
        message: 'No Face Detected. Please use a better image',
        level: 'error',
      });
      isSuccess = false;
    }
    return isSuccess;
  }

  async computeLikeness() {
    const distance = this._faceApi.utils.round(
      this._faceApi.euclideanDistance(
        this.identityCardDescriptor,
        this.selfieDescriptor
      )
    );
    return distance;
  }
}
