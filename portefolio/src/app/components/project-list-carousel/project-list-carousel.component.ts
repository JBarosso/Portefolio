import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/utilities/project';
import { PROJECT } from 'src/app/utilities/project-list';

@Component({
  selector: 'app-project-list-carousel',
  templateUrl: './project-list-carousel.component.html',
  styleUrls: ['./project-list-carousel.component.scss']
})
export class ProjectListCarouselComponent implements OnInit {
  projectList: Project[] = PROJECT;

  //* SLICK CAROUSEL
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: "<div class='carouselBtn carouselBtn--next'>Next</div>",
    prevArrow: "<div class='carouselBtn carouselBtn--prev'>Prev</div>",
    infinite: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "cubic-bezier(0.62,0.05,0.01,0.99)",
    speed: 1250,
    zIndex: 1,
    dots: true,
    customPaging: function (slider: any, i: any) {
      return  (i + 1) + '/' + slider.slideCount;
    },
    responsive:[
      {
        breakpoint: 1201,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        centerMode: true,
        centerPadding: '16px',
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
