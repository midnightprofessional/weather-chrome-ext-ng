import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class ContentPageComponent implements OnInit {
  @Input() active = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.active);
  }

}
