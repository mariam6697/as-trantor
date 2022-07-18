import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import CustomFile from 'src/models/file.model';
import { FileService } from 'src/services/file.service';

@Component({
  selector: 'app-extra-images',
  templateUrl: './extra-images.component.html',
  styleUrls: ['./extra-images.component.scss'],
})
export class ExtraImagesComponent implements OnInit {
  @Input('extra-images') extraImages: CustomFile[];
  @Output('load-project') loadProject: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDeleteDialog = (image: CustomFile): void => {
    const dialogRef = this.dialog.open(DeleteImageDialog, {
      data: { image },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.reload) {
        this.loadProject.emit();
      }
    });
  };
}

@Component({
  selector: 'delete-image-dialog',
  templateUrl: 'delete-image-dialog.html',
})
export class DeleteImageDialog {
  _loading: boolean = false;
  image: CustomFile;

  constructor(
    public dialogRef: MatDialogRef<ExtraImagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileService: FileService,
    private _snackBar: MatSnackBar
  ) {
    this.image = data.image;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  ngOnInit(): void {}

  onNoClick = (): void => {
    this.dialogRef.close({ reload: false });
  };

  delete = async (): Promise<void> => {
    try {
      this.loading = true;
      const response: any = await this.fileService.deleteFile(this.image._id!);
      if (response.status === 'ok') {
        this.dialogRef.close({ reload: true });
      } else {
        throw new Error('Error al eliminar imagen');
      }
    } catch (error: any) {
      this._snackBar.open('Ocurrió un error al eliminar la imagen', 'Cerrar', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    } finally {
      this.loading = false;
    }
  };
}
