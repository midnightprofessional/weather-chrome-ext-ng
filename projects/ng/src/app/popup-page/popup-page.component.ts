import { Component, OnInit } from '@angular/core';

import { OpenWeatherData, TempetureScale } from 'projects/shared/open-weather.data-model';
import { MessageType } from 'projects/shared/message.data-model';
import { addCity, removeCity, getHomeCityWeather, getCityWeathers, getTempetureScale, setTempetureScale } from 'projects/shared/city-weather.service'

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

      this.scale = await getTempetureScale();

      await this.loadHomeCityWeather();
      await this.loadCityWeathers();
    } finally {
      this.loading = false;
    }
  }

  private async loadHomeCityWeather() {
    const [homeCity, homeWeather] = await getHomeCityWeather() ?? [];
    this.homeCity = homeCity;
    this.homeCityWeatherData = homeWeather;
  }

  private async loadCityWeathers() {
    const cityWeathers = await getCityWeathers();
    this.cities = cityWeathers.map(([c]) => c);
    this.weatherDatas = cityWeathers.map(([, w]) => w);
  }

  onKeyUp() {
    if (this.errMsg)
      delete this.errMsg;
  }

  async onAddCity(input: HTMLInputElement) {
    try {
      this.loading = true;

      const cityWeathers = await addCity(input.value);
      this.cities = cityWeathers.map(([city]) => city);
      this.weatherDatas = cityWeathers.map(([, weather]) => weather);

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
      await setTempetureScale(this.scale);

      await this.loadHomeCityWeather();
      await this.loadCityWeathers();
    } finally {
      this.loading = false;
    }
  }

  async onOverlayToggle() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const msg: MessageType = 'TOGGLE_OVERLAY';
      chrome.tabs.sendMessage(tabs[0].id!, msg, function (response) { });
    });
  }

  async onDelete(city: string) {
    try {
      this.loading = true;

      const cityWeathers = await removeCity(city);
      this.cities = cityWeathers.map(([city]) => city);
      this.weatherDatas = cityWeathers.map(([, weather]) => weather);
    } catch (err) {
      this.errMsg = err.message;
    } finally {
      this.loading = false;
    }
  }

}
