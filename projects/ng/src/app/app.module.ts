import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { PopupPageComponent } from './popup-page/popup-page.component';
import { OptionsPageComponent } from './options-page/options-page.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { CityAddComponent } from './popup-page/city-add/city-add.component';
import { ScaleToggleComponent } from './popup-page/scale-toggle/scale-toggle.component';
import { WeatherCardComponent } from './popup-page/weather-card/weather-card.component';
import { OverlayToggleComponent } from './popup-page/overlay-toggle/overlay-toggle.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [PopupPageComponent, OptionsPageComponent, ContentPageComponent, CityAddComponent, ScaleToggleComponent, WeatherCardComponent, OverlayToggleComponent],
  exports: [PopupPageComponent, OptionsPageComponent, ContentPageComponent],
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) { }

  ngDoBootstrap(): void {
    const popup = createCustomElement(PopupPageComponent, { injector: this.injector });
    customElements.define('popup-page', popup);

    const options = createCustomElement(OptionsPageComponent, { injector: this.injector });
    customElements.define('options-page', options);

    const content = createCustomElement(ContentPageComponent, { injector: this.injector });
    customElements.define('content-page', content);
  }

}
