import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import CustomFile from 'src/models/file.model';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  apiUrl: string = environment.apiUrl;

  constructor(
    protected sanitizer: DomSanitizer,
    private localDataService: LocalDataService
  ) {}

  fromBase64ToFile = (fileData: CustomFile): SafeResourceUrl => {
    const safeFile: SafeResourceUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:${fileData.type};base64,${fileData.base64}`
      );
    return safeFile;
  };

  fromFileToBase64 = (
    fileData: any,
    extension?: string
  ): Promise<CustomFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileData);
      reader.onload = async () => {
        try {
          const base64: string = reader.result!.toString().split(',')[1];
          const file: CustomFile = {
            extension: extension ? extension : '.jpg',
            size: fileData.size,
            type: fileData.type,
            base64: base64,
          };
          resolve(file);
        } catch (err) {
          reject(err);
        }
      };
    });
  };

  addProjectMainImage = async (
    fileData: CustomFile,
    projectId: string
  ): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/files/project/main/${projectId}`;
    const response: any = await axios.post(url, fileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };

  addProjectExtraImage = async (
    fileData: CustomFile,
    projectId: string
  ): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/files/project/extra/${projectId}`;
    const response: any = await axios.post(url, fileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };

  deleteFile = async (fileId: string): Promise<any> => {
    const accessToken: string = this.localDataService.getAccessToken();
    const url: string = `${this.apiUrl}/core/files/${fileId}`;
    const response: any = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = response.data;
    return data;
  };
}
