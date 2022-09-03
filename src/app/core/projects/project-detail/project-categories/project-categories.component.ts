import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Category from 'src/models/category.model';
import Project from 'src/models/project.model';
import { CategoryService } from 'src/services/category.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-project-categories',
  templateUrl: './project-categories.component.html',
  styleUrls: ['./project-categories.component.scss'],
})
export class ProjectCategoriesComponent implements OnInit {
  @Input() projectData: Project;
  @Input() loading: boolean;
  @Input() reloadProjectData: () => Promise<void>;
  project: Project;
  categoryForm: FormGroup;
  categories: Category[] = [];
  allCategories: Category[];

  constructor(
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    this.categoryForm = this.fb.group({
      category: new FormControl<any>('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.setCategoriesData(this.projectData);
  }

  setCategoriesData = (project: Project): void => {
    this.project = { ...project };
    if (this.project.categories && this.project.categories.length > 0) {
      this.categories = this.project.categories;
    }
    this.getAllCategories();
  };

  getAllCategories = async (): Promise<void> => {
    try {
      const res: any = await this.categoryService.getAll(1, 999);
      const categories: Category[] = res.data.categories;
      this.allCategories = categories.filter((category: Category) => {
        return !this.categories.some((cat: Category) => {
          return cat._id === category._id;
        });
      });
    } catch (error: any) {
      this._snackBar.open(
        'Ocurrió un error al cargar las categorías',
        'Cerrar',
        {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        }
      );
    }
  };

  removeCategory = async (category: Category): Promise<void> => {
    const categories: string[] = this.categories.map((category: Category) => {
      return category._id || '';
    });
    const index: number = categories.indexOf(category._id!);
    if (index > -1) {
      this.categoryForm.disable();
      categories.splice(index, 1);
      await this.saveCategories(categories);
      this.categoryForm.enable();
    }
  };

  addCategory = async (): Promise<void> => {
    if (this.categoryForm.valid) {
      this.categoryForm.disable();
      const categories: string[] = this.categories.map((category: Category) => {
        return category._id || '';
      });
      const newCat: Category = this.categoryForm.value.category;
      categories.push(newCat._id!);
      await this.saveCategories(categories);
      this.categoryForm.clearValidators();
      this.categoryForm.setValue({ category: '' });
      this.categoryForm.enable();
    }
  };

  saveCategories = async (categories: string[]): Promise<void> => {
    await this.projectService.update(this.project._id!, {
      categories,
    } as Project);
    await this.getProjectData();
  };

  getOptionText = (option: Category) => {
    return option.label;
  };

  getProjectData = async (): Promise<void> => {
    await this.reloadProjectData();
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projectData) {
      this.setCategoriesData(this.projectData);
    }
  }
}
