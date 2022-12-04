import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsComponent } from './projects.component';
import { UpdatesComponent } from './updates/updates.component';

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
  {
    path: 'updates/:projectId',
    component: UpdatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
