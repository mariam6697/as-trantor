import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: ':projectId',
    component: ProjectDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
