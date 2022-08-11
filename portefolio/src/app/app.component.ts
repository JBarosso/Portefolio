import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { translateDown, translateUp } from './utilities/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProjectListCarouselComponent } from './components/project-list-carousel/project-list-carousel.component';
import { reduce } from 'rxjs';

declare const splitFunction:any;

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [translateDown, translateUp]
})
export class AppComponent implements OnInit,AfterViewInit{

  @ViewChild('projectItem', {static: true}) projectItem: ElementRef<HTMLDivElement>;
  @ViewChild('work', {static: true}) work: ElementRef<HTMLDivElement>;
  @ViewChild(HeaderComponent) elHeader !: HeaderComponent;
  @ViewChild(ProjectListCarouselComponent) elProjectlist !: ProjectListCarouselComponent;

  constructor(@Inject(DOCUMENT) private document: Document){}

  //! ONINIT
  ngOnInit(): void {
    this.disableScroll(true);

    //* JS SPLIT TEXT for LETTER AND WORD
    // splitFunction('letterAnim');
    // splitFunction('wordAnim');
  }

  //! AFTERVIEWINIT
  ngAfterViewInit(): void {
    this.initAnimations();
    this.onScrollAnimation();
  }

  //! FUNCTION
  disableScroll(disabled: boolean): void {
    if(window.innerWidth>767){
      if (disabled) {
        this.document.querySelector('body')!.style.overflowY = 'hidden';
      } else {
        this.document.querySelector('body')!.style.overflowY = 'auto';
      }
    }
  }

  initAnimations(): void{
    gsap.from(this.elHeader.header.nativeElement.childNodes, {
      delay: 0.7,
      duration: 1.25,
      ease: 'cubic-bezier(0.62,0.05,0.01,0.99)',
      y: '-100%',
      opacity: 0,
      stagger: 0,
      onComplete: () => this.disableScroll(false)
    })
  }

  onScrollAnimation(): void{
    let projectItems = gsap.utils.toArray(".projectItem");

    ScrollTrigger.matchMedia({

      "(min-width: 768px)" : function() {
        let tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: '.about',
            scrub: 1.25,
            markers: true,
            start: "5% 80%",
            end: "top 10%",
            toggleActions: "play none none none",
          }
        })

        tl1.from(".about__left", {duration: 1.25, height:'0'});

        gsap.from(projectItems,{
          scrollTrigger: {
            trigger: ".work",
            scrub: 1,
            start: "top 80%",
            end: "top top",
            toggleActions: "play none none none",
          },
          duration: 1.25,
          y: -100,
        })
      }

    });
  }
}
