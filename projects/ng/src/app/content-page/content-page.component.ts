import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { OpenWeatherData, TempetureScale } from 'projects/shared/open-weather.data-model';
import weather from 'projects/shared/open-weather.service';
import storage from 'projects/shared/local-storage.service';

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
