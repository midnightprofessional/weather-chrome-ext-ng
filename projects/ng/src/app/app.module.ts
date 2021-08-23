import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { PopupPageComponent } from './popup-page/popup-page.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [PopupPageComponent],
  exports: [PopupPageComponent],
})
export class AppModule implements DoBootstrap {
  
  constructor(private injector: Injector) { }

  ngDoBootstrap(): void {
    const customButton = createCustomElement(PopupPageComponent, { injector: this.injector });
    customElements.define('popup-page', customButton);
  }

 }
