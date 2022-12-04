import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Project from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';
import { UpdatesService } from 'src/services/updates.service';
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
      const updates: any = await this.updatesService.get(
        this.projectId,
        this.page,
        this.limit
      );
      console.log('updates', updates);
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
}
