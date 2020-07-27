import { Injectable } from '@angular/core';
import * as faceApi from 'face-api.js';

@Injectable({
  providedIn: 'root',
})
export class FaceapiService {
  private _faceApi = faceApi;
  private weightURI = '/assets/weights';

  private identityCardDescriptor: Float32Array | number[];
  private selfieDescriptor: any;

  constructor() {}

  async loadModels() {
    await this._faceApi.loadFaceLandmarkModel(this.weightURI);
    await this._faceApi.loadFaceRecognitionModel(this.weightURI);
    await this._faceApi.nets.tinyFaceDetector.load(this.weightURI);
  }

  async fetchImage(input) {
    return await this._faceApi.fetchImage(input);
  }

  async detectFaces(input: string) {
    const inputSize = 512;
    const scoreThreshold = 0.5;
    let faceApiInput = await this.fetchImage(input);

    let faceDetectorOptions = new this._faceApi.TinyFaceDetectorOptions({
      inputSize,
      scoreThreshold,
    });

    let result = await this._faceApi
      .detectAllFaces(faceApiInput, faceDetectorOptions)
      .withFaceLandmarks()
      .withFaceDescriptors();

    this.identityCardDescriptor = result[0].descriptor;
  }

  async faceDescriptor(input: string) {
    let faceApiInput = await this.fetchImage(input);
    this.selfieDescriptor = await this._faceApi.computeFaceDescriptor(
      faceApiInput
    );
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
