import Category from './category.model';
import CustomFile from './file.model';

export default interface Project {
  _id?: string;
  nanoId?: string;
  name: string;
  description?: string;
  shortDescription?: string;
  highlighted?: boolean;
  visible?: boolean;
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
  project?: string;
}

export enum Semester {
  one = '1',
  two = '2',
}
