import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {class: "header"},
})
export class HeaderComponent implements OnInit {

  @ViewChild('header', {static: true}) header: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document: Document) { }

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

  //? TOGGLE MENU RESPONSIVE
  toggleMenuStatus: boolean = false;
  toggleMenu(){
    this.toggleMenuStatus = !this.toggleMenuStatus;
    if(this.toggleMenuStatus){
      this.document.querySelector('body')!.style.overflowY = 'hidden';
    } else {
      this.document.querySelector('body')!.style.overflowY = 'auto';
    }
  }
}
