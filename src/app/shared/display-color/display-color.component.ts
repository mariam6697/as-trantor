import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-color',
  templateUrl: './display-color.component.html',
  styleUrls: ['./display-color.component.scss'],
})
export class DisplayColorComponent implements OnInit {
  @Input('hex-color') hexColor: string;

  constructor() {}

  ngOnInit(): void {}
}
