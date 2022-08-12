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
    let menuItems = gsap.utils.toArray<HTMLElement>('.nav__item a');
    // let bgCircle = gsap.utils.toArray<HTMLElement>('.backgroundSite__circle');

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
            markers: true,
            trigger: ".intro",
            start: "top, 5%",
            end: "bottom bottom",
            toggleActions: "restart none reverse reset",
          },
        });
      }
    });

    menuItems.forEach(function(item, i){

      console.log("Item" + i);
      item.onmousemove = function(event){
        console.log(event.pageX);
        console.log(event.pageY);
      }
    })

    gsap.set(".backgroundSite__circle", {xPercent: -50, yPercent: -50});

    var circle = document.querySelector(".backgroundSite__circle");
    var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var mouse = { x: pos.x, y: pos.y };
    var speed = 0.1;

    var xSet: any;
    var ySet: any;

    function circleReset(el: any){
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.opacity = '1';
      el.style.top = '0';
      el.style.right = '0';
    }

    menuItems.forEach( function(item){

      item.onmouseover = function(){

        xSet = gsap.quickSetter(circle, "x", "px");
        ySet = gsap.quickSetter(circle, "y", "px");

        item.onmousemove = function(e){
          mouse.x = e.x;
          mouse.y = e.y;
          circleReset(circle);
        }
      };

      item.onmouseleave = function(){
        mouse.x = 0;
        mouse.y = 0;
      }
    });

    gsap.ticker.add(() => {
      var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
  }
}
