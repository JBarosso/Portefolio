import { Component, OnInit } from '@angular/core';
import { translateDown, translateUp } from './utilities/animations';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [translateDown, translateUp]
})
export class AppComponent implements OnInit{

  ngOnInit(): void {

    //* Animation au scroll
    AOS.init({
      disable: 'mobile',
      once: true,
    });
  }
}
