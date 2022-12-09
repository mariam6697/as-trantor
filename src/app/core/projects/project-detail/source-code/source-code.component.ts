import { Component, Input, OnInit } from '@angular/core';
import Project from 'src/models/project.model';
import { RemoteFile } from 'src/models/remote.model';
import Repository from 'src/models/repository.model';
import { FileService } from 'src/services/file.service';
import { RepositoryService } from 'src/services/repository.service';

@Component({
  selector: 'app-source-code',
  templateUrl: './source-code.component.html',
  styleUrls: ['./source-code.component.scss'],
})
export class SourceCodeComponent implements OnInit {
  @Input() projectData: Project;
  @Input() loading: boolean;
  @Input() reloadProjectData: () => Promise<void>;
  project: Project;
  repos: Repository[] = [];
  hasRepository: boolean = false;
  files: RemoteFile[] = [];
  uploadNewRepo: boolean = false;
  privateRepo: boolean = true;
  repoDesc: string = '';
  uploadingCode: boolean = false;

  constructor(
    private repositoryService: RepositoryService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.project = { ...this.projectData };
    this.getRepositories();
  }

  getRepositories = async () => {
    try {
      const repositories: Repository[] = await this.repositoryService.get(
        this.project.nanoId!
      );
      this.repos = repositories;
      if (this.repos.length > 0) {
        this.hasRepository = true;
      } else {
        this.hasRepository = false;
      }
    } catch (error: any) {
      // Handle error
    }
  };

  filesPicked = async (files: FileList | null): Promise<void> => {
    if (files) {
      const remoteFiles: RemoteFile[] = [];

      for (let i = 0; i < files.length; i++) {
        let file: any = { path: files[i]['webkitRelativePath'] };
        file['fileData'] = await this.fileService.fromFileToBase64(
          files[i],
          files[i].name.split('.')[0]
        );
        remoteFiles.push(file);
      }
      this.files = remoteFiles;
    } else {
      this.files = [];
    }
  };

  uploadFiles = async (): Promise<void> => {
    if (this.files.length > 0) {
      this.uploadingCode = true;
      await this.repositoryService.create(
        this.project._id!,
        this.repoDesc,
        this.privateRepo,
        this.files
      );
      this.uploadingCode = false;
      await this.getRepositories();
    }
  };
}
