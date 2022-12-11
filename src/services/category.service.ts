import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import Category from 'src/models/category.model';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl: string = environment.apiUrl;

  constructor(private localDataService: LocalDataService) {}

  create = async (categoryData: Category): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/categories`;
    const response: any = await axios.post(url, categoryData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };

  get = async (categoryId: string): Promise<Category> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/categories/${categoryId}`;
    const response: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const category: Category = response.data.data;
    return category;
  };

  getAll = async (page: number, limit: number): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    let url: string = `${this.apiUrl}/core/categories?page=${page}&limit=${limit}`;
    const response: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  update = async (categoryId: string, categoryData: Category): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/categories/${categoryId}`;
    const response: any = await axios.put(url, categoryData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };

  remove = async (categoryId: string): Promise<void> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/categories/${categoryId}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
}
