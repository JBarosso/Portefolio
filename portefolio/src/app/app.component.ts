import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { translateDown, translateUp } from './utilities/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProjectListCarouselComponent } from './components/project-list-carousel/project-list-carousel.component';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
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

  constructor(@Inject(DOCUMENT) private document: Document){
    
  }

  //! ONINIT
  ngOnInit(): void {
    this.disableScroll(true);
  }

  //! AFTERVIEWINIT
  ngAfterViewInit(): void {

    if(window.innerWidth > 767){
      this.initAnimations();
    }
    this.onScrollAnimation();
    // this.splitText("word");
    // this.splitText("letter");
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
    let wordWrapper = document.querySelectorAll(".word__wrapper");
    let introImgContainer = document.querySelectorAll(".intro__img");
    let introImg = document.querySelectorAll(".intro__img img");
    gsap.set(introImgContainer, {autoAlpha: 0});

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body'
      },
      onComplete: () => this.disableScroll(false)
    });

    tl.from(this.elHeader.header.nativeElement.childNodes, {
      delay: 0.7,
      duration: 1.25,
      ease: 'cubic-bezier(0.62,0.05,0.01,0.99)',
      y: '-100%',
      opacity: 0,
      stagger: 0,
    }),
    wordWrapper.forEach((item) =>{
      const word = item.querySelector(".word__anim");

      tl.from(word, .6, {
        yPercent: 100,
      })
    }),
    tl.set(introImgContainer, {autoAlpha: 1})
    .from( introImgContainer, 1.5, {
      xPercent: -100,
    })
    .from(introImg, 1.5, {
      xPercent: 100,
      scale: 1.3,
      delay: -1.5,
    });

    //? SCROLL ANCHOR NAV
    this.document.querySelectorAll(".nav a").forEach((item:any) => {
      const target = item.getAttribute("href");
      const targetEl = document.querySelector(target);
      const targetRect = targetEl.getBoundingClientRect();

      item.addEventListener("click", (e:any) => {
        e.preventDefault();
        
        gsap.to(window, {
          scrollTo: targetRect.top,
        });
      })
    })
  }

  onScrollAnimation(): void{
    let wordAnim1 = gsap.utils.toArray<HTMLElement>(".sectionTitre__container");
    let wordAnim2 = gsap.utils.toArray<HTMLElement>(".wordWrapper");
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

        wordAnim1.forEach((item) =>{
          const word = item.querySelector(".letterAnim");

          gsap.from(word, .6, {
            yPercent: 100,
            duration: .6,
            scrollTrigger:{
              trigger: item,
              start: "-=50 90%",
              toggleActions: "restart none reverse reset",
            }
          })
        })

        wordAnim2.forEach((item) =>{
          const word = item.querySelector(".wordAnim");

          gsap.from(word, .6, {
            yPercent: 100,
            duration: .6,
            delay: .6,
            scrollTrigger:{
              trigger: item,
              start: "-=30 90%",
              toggleActions: "restart none reverse reset",
            }
          })
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

  }

  //* En cours
  splitText(target: string): void{
    const letterAnims = this.document.querySelectorAll(".letterAnim");
    const wordAnims = this.document.querySelectorAll(".wordAnim");

    if(target == "word"){

      wordAnims.forEach((text) =>{
        const textHtml = text.textContent;
        const result = textHtml!.split(/(\s+)/);

        result.forEach((item) => {
          console.log(item);
          text.innerHTML += ("<span>"+ item +"</span>");
        })
      })
    }

    if(target == "letter"){

      letterAnims.forEach((text) =>{
        const textHtml = text.textContent;
        const result = textHtml!.split(/(\s+)/);

        result.forEach((item) => {
          const letterResult = item!.split("");

          letterResult.forEach((letter) =>{
            text.innerHTML += ("<span>"+ letter +"</span>");
          })
        })
      })
    }


  }
}
