import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import Repository from 'src/models/repository.model';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  apiUrl: string = environment.apiUrl;
  constructor() {}

  create = async (projectId: string, files: any): Promise<Repository> => {
    const accessToken: string = LocalDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/repositories/${projectId}`;
    const response: any = await axios.post(
      url,
      { files },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data: Repository = response.data.data;
    return data;
  };

  get = async (projectId: string): Promise<Repository[]> => {
    const accessToken: string = LocalDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/repositories/project/${projectId}`;
    const response: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: Repository[] = response.data.data;
    return data;
  };

  delete = async (repoId: string): Promise<void> => {
    const accessToken: string = LocalDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/repositories/${repoId}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
}
