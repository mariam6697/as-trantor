import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  constructor() {}

  writeData = (key: string, value: any): void => {
    try {
      const data: string = JSON.stringify(value);
      localStorage.setItem(key, data);
    } catch (error: any) {
      throw error;
    }
  };

  readData = (key: string): any => {
    try {
      const data: any = localStorage.getItem(key);
      const value: any = JSON.parse(data);
      return value;
    } catch (error: any) {
      throw error;
    }
  };

  deleteData = (key: string): void => {
    localStorage.removeItem(key);
  };

  deleteAll = (): void => {
    localStorage.clear();
  };

  static getAccessToken = (): string => {
    const data: any = localStorage.getItem('user');
    const user: any = JSON.parse(data);
    if (user && user.accessToken) {
      return user.accessToken;
    } else {
      throw new Error('No access token found');
    }
  };
}
