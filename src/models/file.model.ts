import { SafeResourceUrl } from '@angular/platform-browser';

export default interface CustomFile {
  _id?: string;
  extension: string;
  size: number;
  type: string;
  base64: string;
  safeFile?: SafeResourceUrl;
}
