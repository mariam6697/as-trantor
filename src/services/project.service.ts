import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import Project from 'src/models/project.model';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl: string = environment.apiUrl;

  constructor(private localDataService: LocalDataService) {}

  create = async (projectData: Project): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/projects`;
    const response: any = await axios.post(url, projectData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };

  get = async (projectId: string): Promise<Project> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/admin/projects/${projectId}`;
    const response: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const project: Project = response.data.data;
    return project;
  };

  getAll = async (
    page: number,
    limit: number,
    search?: string
  ): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    let url: string = `${this.apiUrl}/admin/projects?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${search}`;
    }
    const response: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  update = async (projectId: string, projectData: Project): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/projects/${projectId}`;
    const response: any = await axios.put(url, projectData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };
}
