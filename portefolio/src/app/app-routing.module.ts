import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

const routes: Routes = [
  { path: 'projects', component: ProjectListComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
