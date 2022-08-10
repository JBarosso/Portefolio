import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListCarouselComponent } from './project-list-carousel.component';

describe('ProjectListCarouselComponent', () => {
  let component: ProjectListCarouselComponent;
  let fixture: ComponentFixture<ProjectListCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
