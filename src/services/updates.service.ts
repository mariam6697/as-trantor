import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ProjectUpdate } from 'src/models/project.model';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root',
})
export class UpdatesService {
  apiUrl: string = environment.apiUrl;
  constructor(private localDataService: LocalDataService) {}

  create = async (
    projectId: string,
    data: ProjectUpdate
  ): Promise<ProjectUpdate> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/projects-updates/${projectId}`;
    const response: any = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res: ProjectUpdate = response.data.data;
    return res;
  };

  get = async (
    projectId: string,
    page: number,
    limit: number
  ): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/projects-updates/${projectId}?page=${page}&limit=${limit}`;
    const response: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res: any = response.data.data;
    return res;
  };

  update = async (
    projectUpdateId: string,
    data: ProjectUpdate
  ): Promise<ProjectUpdate> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/projects-updates/${projectUpdateId}`;
    const response: any = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res: ProjectUpdate = response.data.data;
    return res;
  };

  remove = async (projectUpdateId: string): Promise<void> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/projects-updates/${projectUpdateId}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
}
