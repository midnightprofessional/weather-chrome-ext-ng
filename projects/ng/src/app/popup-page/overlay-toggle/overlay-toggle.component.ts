import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-overlay-toggle',
  templateUrl: './overlay-toggle.component.html',
  styleUrls: ['./overlay-toggle.component.scss']
})
export class OverlayToggleComponent {

  @Output() toggle = new EventEmitter<void>();

  onClick() {
    this.toggle.emit();
  }
}
