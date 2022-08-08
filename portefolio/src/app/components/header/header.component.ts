import { Component, HostListener, OnInit } from '@angular/core';
import { translateDown } from 'src/app/utilities/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {class: "header"},
  animations: [translateDown]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //? On scroll function
  //* Ajout de la classe "scrollOk" sur "header__job"
  window_scroll = false;
  @HostListener('document:scroll')
  scrollFunction(){
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
      this.window_scroll = true;
    }
    else{
      this.window_scroll = false;
    }
  }
}
