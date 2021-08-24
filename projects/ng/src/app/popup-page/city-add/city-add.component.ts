import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.scss']
})
export class CityAddComponent implements OnInit {
  @Input() errMsg?: string;
  @Input() loading?: boolean;
  @Output() keyupCity = new EventEmitter<void>();
  @Output() addCity = new EventEmitter<HTMLInputElement>();


  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(event: KeyboardEvent) {
    this.keyupCity.emit();
  }

  onAdd(input: HTMLInputElement) {
    this.addCity.emit(input);
  }

}
