import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {class: "header"},
})
export class HeaderComponent implements OnInit {

  @ViewChild('header', {static: true}) header: ElementRef<HTMLDivElement>;

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
