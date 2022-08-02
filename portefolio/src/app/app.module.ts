import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { NavComponent } from './components/nav/nav.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    NavComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
