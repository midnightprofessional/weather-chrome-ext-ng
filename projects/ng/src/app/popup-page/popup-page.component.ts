import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { OpenWeatherData, TempetureScale } from 'projects/shared/open-weather.data-model';
import weather from 'projects/shared/open-weather.service';
import storage from 'projects/shared/local-storage.service';

@Component({
  selector: 'app-popup-page',
  templateUrl: './popup-page.component.html',
  styleUrls: ['./popup-page.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class PopupPageComponent implements OnInit {

  loading = false;
  errMsg?: string;

  scale?: TempetureScale;

  homeCity?: string;
  homeCityWeatherData?: OpenWeatherData;

  cities: string[] = [];
  weatherDatas: OpenWeatherData[] = [];


  constructor() { }

  async ngOnInit() {
    try {
      this.loading = true;
      this.scale = await storage.getTempetureScale();
      this.homeCity = await storage.getHomeCity();
      if (this.homeCity)
        this.homeCityWeatherData = await weather.fetchWeatherData(this.homeCity, this.scale)
      this.cities = await storage.getCities();
      this.weatherDatas = await this.getWeatherData(this.cities, this.scale);
    } finally {
      this.loading = false;
    }

  }

  onKeyUp() {
    if (this.errMsg)
      delete this.errMsg;
  }

  async onAddCity(input: HTMLInputElement) {
    try {
      this.loading = true;

      const city = input.value;
      if (!city)
        throw new Error('city is empty');

      if (this.cities.some(v => v.toUpperCase() === city.toUpperCase()))
        throw new Error(`${city} is already added`);

      this.weatherDatas = await this.getWeatherData([...this.cities, city], this.scale);
      this.cities = await storage.addCity(city);

      input.value = '';
    } catch (err) {
      this.errMsg = err.message;
    } finally {
      this.loading = false;
    }
  }

  async onScaleToggle() {
    try {
      this.loading = true;

      this.scale = this.scale === 'metric' ? 'imperial' : 'metric';
      await storage.setTempetureScale(this.scale);
      if (this.homeCity)
        this.homeCityWeatherData = await weather.fetchWeatherData(this.homeCity, this.scale)
      this.weatherDatas = await this.getWeatherData(this.cities, this.scale);
    } finally {
      this.loading = false;
    }
  }

  onOverlayToggle() {
    throw Error('TODO');
  }

  async onDelete(city: string) {
    try {
      this.loading = true;

      this.cities = await storage.removeCity(city);
      this.weatherDatas = await this.getWeatherData(this.cities, this.scale);
    } catch (err) {
      this.errMsg = err.message;
    } finally {
      this.loading = false;
    }
  }

  private async getWeatherData(cities: string[], scale: TempetureScale = 'metric'): Promise<OpenWeatherData[]> {
    return await Promise.all(cities.map(c => weather.fetchWeatherData(c, scale)));
  }

}
