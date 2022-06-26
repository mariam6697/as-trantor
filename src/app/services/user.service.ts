import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { LocalDataService } from './local-data.service';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor() {}

  login = async (email: string, password: string): Promise<any> => {
    const data: any = { email, password };
    const response: any = await axios.post(
      `${this.apiUrl}/auth/users/login`,
      data
    );
    return response.data;
  };

  create = async (userData: User): Promise<any> => {
    const accessToken: string = LocalDataService.getAccessToken();
    const url: string = `${this.apiUrl}/auth/users`;
    const response: any = await axios.post(url, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };

  get = async (userId: string): Promise<any> => {
    const accessToken: string = LocalDataService.getAccessToken();
    const url: string = `${this.apiUrl}/auth/users/${userId}`;
    const response: any = await axios.get(url, {
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
    let url: string = `${this.apiUrl}/auth/users?page=${page}&limit=${limit}`;
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

  update = async (userId: string, userData: User): Promise<any> => {
    const accessToken: string = LocalDataService.getAccessToken();
    const url: string = `${this.apiUrl}/auth/users/${userId}`;
    const response: any = await axios.put(url, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };

  delete = async (userId: string): Promise<any> => {
    const accessToken: string = LocalDataService.getAccessToken();
    const url: string = `${this.apiUrl}/auth/users/${userId}`;
    const response: any = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };
}
