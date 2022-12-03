import { TestBed } from '@angular/core/testing';

import { UsersGuard } from './users.guard';

describe('UsersGuard', () => {
  let guard: UsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
