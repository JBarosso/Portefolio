import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/utilities/project';
import { PROJECT } from 'src/app/utilities/project-list';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  host: {class: "projectList"},
})
export class ProjectListComponent implements OnInit {
  projectList: Project[] = PROJECT;

  constructor() { }

  ngOnInit(): void {

  }
}
