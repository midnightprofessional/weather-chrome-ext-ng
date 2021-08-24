import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ContentPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
