import { TestBed } from '@angular/core/testing';

import { ProjectsGuard } from './projects.guard';

describe('ProjectsGuard', () => {
  let guard: ProjectsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProjectsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
