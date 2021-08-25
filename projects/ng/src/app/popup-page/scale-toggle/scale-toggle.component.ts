import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TempetureScale } from 'projects/shared/models/open-weather.data-model';

@Component({
  selector: 'app-scale-toggle',
  templateUrl: './scale-toggle.component.html',
  styleUrls: ['./scale-toggle.component.scss']
})
export class ScaleToggleComponent implements OnInit {
  @Input() scale?: TempetureScale;
  @Output() scaleToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.scaleToggle.emit();
  }

}
