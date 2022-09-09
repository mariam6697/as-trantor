import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Repository from 'src/models/repository.model';
import { RepositoryService } from 'src/services/repository.service';
import { RepoComponent } from '../repo/repo.component';

@Component({
  selector: 'app-delete-repo-dialog',
  templateUrl: './delete-repo-dialog.component.html',
  styleUrls: ['./delete-repo-dialog.component.scss'],
})
export class DeleteRepoDialogComponent implements OnInit {
  _loading: boolean = false;
  repo: Repository;

  constructor(
    private repositoryService: RepositoryService,
    public dialogRef: MatDialogRef<RepoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.repo = data.repo;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  ngOnInit(): void {}

  onNoClick = (): void => {
    this.dialogRef.close();
  };

  delete = async (): Promise<void> => {
    try {
      this.loading = true;
      await this.repositoryService.delete(this.repo._id!);
      this.dialogRef.close();
    } catch (error: any) {
      this._snackBar.open(
        'Ocurrió un error al eliminar el repositorio',
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
