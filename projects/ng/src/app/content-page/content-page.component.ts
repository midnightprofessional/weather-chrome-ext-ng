import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { OpenWeatherData, TempetureScale } from 'projects/shared/models/open-weather.data-model';
import storage from 'projects/shared/services/local-storage.service';
import weather from 'projects/shared/services/open-weather.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ContentPageComponent implements OnInit {
  @Input() active = false;

  scale?: TempetureScale;
  homeCity?: string;
  homeCityWeatherData?: OpenWeatherData;

  constructor() { }

  async ngOnInit() {
    this.scale = await storage.getTempetureScale();
    this.homeCity = await storage.getHomeCity();
    if (this.homeCity)
      this.homeCityWeatherData = await weather.fetchWeatherData(this.homeCity, this.scale)
  }

}
