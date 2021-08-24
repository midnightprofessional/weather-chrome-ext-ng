import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { PopupPageComponent } from './popup-page/popup-page.component';
import { OptionsPageComponent } from './options-page/options-page.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [PopupPageComponent, OptionsPageComponent],
  exports: [PopupPageComponent, OptionsPageComponent],
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) { }

  ngDoBootstrap(): void {
    const popup = createCustomElement(PopupPageComponent, { injector: this.injector });
    customElements.define('popup-page', popup);

    const options = createCustomElement(OptionsPageComponent, { injector: this.injector });
    customElements.define('options-page', options);
  }

}
