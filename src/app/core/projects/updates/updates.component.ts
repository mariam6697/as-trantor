import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Project, { ProjectUpdate } from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';
import { UpdatesService } from 'src/services/updates.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})
export class UpdatesComponent implements OnInit {
  projectId: string = '';
  project: Project;
  loading: boolean = true;
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;
  updates: ProjectUpdate[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private updatesService: UpdatesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const projectId = params['projectId'];
      this.projectId = projectId;
      this.getProjectUpdates();
    });
  }

  getProjectUpdates = async (): Promise<void> => {
    try {
      const project: Project = await this.projectService.get(this.projectId);
      this.project = project;
      const updates: any = await this.updatesService.get(
        this.projectId,
        this.page,
        this.limit
      );
      this.updates = updates.projectUpdates;
      this.totalItems = updates.totalItems;
    } catch (error: any) {
      this.router.navigate([`../projects`]);
      this._snackBar.open('Ocurrió un error al cargar los datos', 'Cerrar', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    } finally {
      this.loading = false;
    }
  };

  openDialog = (): void => {
    const dialogRef = this._dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { projectId: this.project._id },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getProjectUpdates();
    });
  };

  openEditDialog = (update: ProjectUpdate): void => {
    const dialogRef = this._dialog.open(EditDialogComponent, {
      width: '400px',
      data: { update: update },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getProjectUpdates();
    });
  };

  handlePageEvent = (event: any): void => {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getProjectUpdates();
  };
}
