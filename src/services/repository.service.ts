import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { RemoteFile } from 'src/models/remote.model';
import Repository from 'src/models/repository.model';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  apiUrl: string = environment.apiUrl;
  constructor(private localDataService: LocalDataService) {}

  create = async (
    projectId: string,
    label: string,
    privateRepo: boolean,
    files: RemoteFile[]
  ): Promise<Repository> => {
    const body: any = {
      files,
      label,
      private: privateRepo,
    };
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/repositories/${projectId}`;
    const response: any = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: Repository = response.data.data;
    return data;
  };

  get = async (projectNanoId: string): Promise<Repository[]> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/repositories/project/${projectNanoId}`;
    const response: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: Repository[] = response.data.data;
    return data;
  };

  delete = async (repoId: string): Promise<void> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/repositories/${repoId}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
}
