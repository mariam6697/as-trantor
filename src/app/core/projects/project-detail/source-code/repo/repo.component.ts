import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from 'src/app/core/users/delete-user-dialog/delete-user-dialog.component';
import Repository from 'src/models/repository.model';
import { RepositoryService } from 'src/services/repository.service';
import { DeleteRepoDialogComponent } from '../delete-repo-dialog/delete-repo-dialog.component';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss'],
})
export class RepoComponent implements OnInit {
  @Input() repo: Repository;
  @Input() reloadRepos: () => Promise<void>;
  loading: boolean = false;

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  openLink = (): void => {
    window.open(this.repo.url, '_blank');
  };

  copyLink = (): void => {
    const textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = this.repo.url!;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  openDeleteDialog = (): void => {
    const dialogRef = this._dialog.open(DeleteRepoDialogComponent, {
      width: '400px',
      data: {
        repo: this.repo,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.reloadRepos();
    });
  };
}
