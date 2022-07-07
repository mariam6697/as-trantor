import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import Project from 'src/models/project.model';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl: string = environment.apiUrl;

  constructor() { }

  create = async (projectData: Project): Promise<any> => {
    const accessToken: string = LocalDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/projects`;
    const response: any = await axios.post(url, projectData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };

  getAll = async (
    page: number,
    limit: number,
    search?: string
  ): Promise<any> => {
    const accessToken: string = LocalDataService.getAccessToken();
    let url: string = `${this.apiUrl}/core/projects?page=${page}&limit=${limit}`;
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
}
