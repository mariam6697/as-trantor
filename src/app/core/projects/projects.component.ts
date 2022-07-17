import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Project from 'src/models/project.model';
import { LocalDataService } from 'src/services/local-data.service';
import { ProjectService } from 'src/services/project.service';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;
  searchString: string = '';
  loading: boolean = true;
  displayedColumns: string[] = [
    'name',
    'year',
    'semester',
    'categories',
    'actions'
  ];
  loggedInUserId: string = '';

  constructor(private projectService: ProjectService,
    private localDataService: LocalDataService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.loggedInUserId = this.localDataService.readData('user').id;
    this.getProjects(this.page, this.limit);
  }

  updateProjectsList = async (event?: PageEvent): Promise<void> => {
    this.page = event!.pageIndex + 1;
    this.limit = event!.pageSize;
    this.getProjects(this.page, this.limit);
  };

  getProjects = async (
    page: number,
    limit: number,
    search?: string
  ): Promise<void> => {
    try {
      this.loading = true;
      const response: any = await this.projectService.getAll(page, limit, search);
      if (response.status === 'ok') {
        this.projects = response.data.projects;
        this.totalItems = response.data.totalItems;
      }
    } catch (error: any) {
      this.projects = [];
      this._snackBar.open(
        'Ocurrió un error al cargar la lista de usuarios',
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

  openDialog = (): void => {
    const dialogRef = this._dialog.open(ProjectDialogComponent, {
      width: '400px',
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProjects(this.page, this.limit);
    });
  };

  goToDetail = (project: Project): void => {
    this.router.navigate([`projects/${project._id}`]);
  };

}
