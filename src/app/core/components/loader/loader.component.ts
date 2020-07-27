import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  text: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: { message?: string }) {
    this.text = data.message;
  }

  ngOnInit(): void {}
}
