import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/utilities/project';
import { PROJECT } from 'src/app/utilities/project-list';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  host: {class: "projectListDetail"},
})
export class ProjectDetailComponent implements OnInit {
  projectList: Project[] = PROJECT;
  project: Project|undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectList = PROJECT;
    const projectId: string|null = this.route.snapshot.paramMap.get('id');

    if(projectId){
      this.project = this.projectList.find(project => project.id == +projectId);
    }
  }

}
