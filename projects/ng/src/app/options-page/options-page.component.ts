import { Component, OnInit } from '@angular/core';

import { getHomeCity, addHomeCity } from 'projects/shared/services/city-weather.service'

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
    this.home = await getHomeCity();
  }

  async onCitySave(input: HTMLInputElement) {
    const city = input.value;

    try {
      this.loading = true;
      await addHomeCity(city);
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
