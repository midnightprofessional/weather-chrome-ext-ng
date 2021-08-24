import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OpenWeatherData, TempetureScale } from 'projects/shared/open-weather.data-model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() weatherData?: OpenWeatherData;
  @Input() tempetureScale?: TempetureScale;
  @Input() isHomeCity = false;
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(city: string) {
    this.delete.emit(city);
  }

}
