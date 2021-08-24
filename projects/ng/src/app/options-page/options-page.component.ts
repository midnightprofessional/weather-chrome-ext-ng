import { Component, OnInit } from '@angular/core';

import weather from 'projects/shared/open-weather.service';
import storage from 'projects/shared/local-storage.service';

@Component({
  selector: 'app-options-page',
  templateUrl: './options-page.component.html',
  styleUrls: ['./options-page.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class OptionsPageComponent implements OnInit {

  loading = false;
  errMsg?: string;

  home?: string;

  constructor() { }

  async ngOnInit() {
    this.home = await storage.getHomeCity();
  }

  async onCitySave(input: HTMLInputElement) {
    const city = input.value;

    try {
      this.loading = true;
      if (city)
        await weather.fetchWeatherData(city);
      await storage.setHomeCity(city);
    } catch (err) {
      this.errMsg = err.message;
    } finally {
      this.loading = false;
    }
  }

  onKeyUp() {
    if (this.errMsg)
      delete this.errMsg;
  }

}
