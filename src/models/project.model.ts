import Category from './category.model';
import CustomFile from './file.model';

export default interface Project {
  _id?: string;
  name: string;
  description?: string;
  semester?: Semester;
  year?: string;
  categories?: any[] | Category[];
  updates?: ProjectUpdate[];
  mainImage?: CustomFile;
  extraImages?: CustomFile[];
}

export interface ProjectUpdate {
  _id?: string;
  title: string;
  description: string;
  date: Date;
}

export enum Semester {
  one = '1',
  two = '2',
}
