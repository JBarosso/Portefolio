import { Component, OnInit } from '@angular/core';
import { translateDown, translateUp } from './utilities/animations';
import * as AOS from 'aos';
declare var $: any;

declare const splitFunction:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [translateDown, translateUp]
})
export class AppComponent implements OnInit{

  ngOnInit(): void {

    //* Animation AOS au scroll
    AOS.init({
      disable: 'mobile',
      once: true,
    });

    splitFunction('letterAnim');
    // splitFunction('wordAnim');

    //* ANIM LETTER AND WORD ON SCROLL

  }
}
