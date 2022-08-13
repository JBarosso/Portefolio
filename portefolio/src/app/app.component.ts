import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { translateDown, translateUp } from './utilities/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProjectListCarouselComponent } from './components/project-list-carousel/project-list-carousel.component';

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
    let projectItems = gsap.utils.toArray<HTMLElement>(".projectItem");
    let contactItems = gsap.utils.toArray<HTMLElement>('.contactItem');
    let sections = gsap.utils.toArray<HTMLElement>('section');
    let bgCircle = gsap.utils.toArray<HTMLElement>('.backgroundSite__circle');

    ScrollTrigger.matchMedia({

      "(min-width: 768px)" : function() {
        let tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: '.about',
            scrub: 1.25,
            start: "5% 80%",
            end: "top 10%",
            toggleActions: "play none none none",
          }
        });

        tl1.from(".about__left", {duration: 1.25, height:'0'});

        contactItems.forEach(item => {
          gsap.from(item, {
            y: 200,
            opacity: 0,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "restart none reverse reset",
            }
          })
        });

        sections.forEach(function (item){
          gsap.fromTo(
            item.querySelectorAll(".container"),
            {opacity: 1},
            {opacity: 0,
              scrollTrigger: {
                trigger: item.querySelectorAll(".container"),
                scrub: 1,
                start: "top 10%",
                toggleActions: "restart none reverse reset",
              }
            }
          )
        })

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
      },

      "(max-width: 767px)" : function(){

        gsap.to(".header__container", {
          backgroundColor: "#F9F5F1",
          duration: .3,
          scrollTrigger: {
            trigger: ".intro",
            start: "top, 5%",
            end: "bottom bottom",
            toggleActions: "restart none reverse reset",
          },
        });
      },

      "(min-width: 992px)" : function(){

        //* Animation cercle hover menu
        let tlCircle = gsap.timeline({ paused: true });

        tlCircle.to(bgCircle,{
          duration: .2,
          opacity: 1,
          width: 40,
          height: 40,
          xPercent: -50,
          yPercent: -50,
          stagger: 0.3,
        });

        let nav = gsap.utils.toArray<HTMLElement>('.nav');

        nav.forEach(function (item) {

          item.addEventListener("mousemove", (e) => {
            tlCircle.play();
            gsap.to(bgCircle,{
              x: e.pageX,
              y: e.pageY - document.documentElement.scrollTop,
            })
          })

          item.addEventListener("mouseleave", (e) => {
            tlCircle.reverse();
            gsap.to(bgCircle,{
              x: window.innerWidth - (window.innerWidth * 0.14) * 2,
              y: "10%",
            })
          })
        });
      }
    });

    //* Animation image projectItem
    // gsap.set('.projectItem__img', { yPercent: -50, xPercent: -50 })
    // gsap.utils.toArray(".projectItem").forEach((el:any) => {

    //   console.log(el.offsetLeft);

    //   const image = el.querySelector('.projectItem__img'),
    //   setX = gsap.quickSetter(image, "x", "px"),
    //   setY = gsap.quickSetter(image, "y", "px"),
    //   align = (e:any) => {
    //     setX(e.pageX);
    //     setY(e.pageY);
    //   },
    //   startFollow = () => document.addEventListener("mousemove", align),
    //   stopFollow = () => document.removeEventListener("mousemove", align),
    //   fade = gsap.to(image, {autoAlpha: 1, ease: "none", paused: true, onReverseComplete: stopFollow});

    //   el.addEventListener('mouseenter', (e:any) => {
    //     fade.play();
    //     startFollow();
    //     align(e);
    //   });

    //   el.addEventListener('mouseleave', () => fade.reverse());

    // });

  }
}
