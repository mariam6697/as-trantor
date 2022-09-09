import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Project from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  projectId: string = '';
  project: Project;
  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar,
    private router: Router,
    protected sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const projectId = params['projectId'];
      this.projectId = projectId;
      this.getProjectData();
    });
  }

  getProjectData = async (): Promise<void> => {
    try {
      const project: Project = await this.projectService.get(this.projectId);
      this.project = project;
    } catch (error: any) {
      this.router.navigate([`../projects`]);
      this._snackBar.open(
        'Ocurrió un error al cargar los datos del proyecto',
        'Cerrar',
        {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        }
      );
    } finally {
      this.loading = false;
    }
  };
}
