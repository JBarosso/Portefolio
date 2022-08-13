import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { NavComponent } from './components/nav/nav.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProjectListCarouselComponent } from './components/project-list-carousel/project-list-carousel.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    NavComponent,
    ContactListComponent,
    HeaderComponent,
    FooterComponent,
    ProjectListCarouselComponent,
    ProjectDetailComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
