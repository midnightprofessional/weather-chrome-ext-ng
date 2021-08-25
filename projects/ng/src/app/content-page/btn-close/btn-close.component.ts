import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn-close',
  templateUrl: './btn-close.component.html',
  styleUrls: ['./btn-close.component.scss']
})
export class BtnCloseComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.close.emit();
  }

}
