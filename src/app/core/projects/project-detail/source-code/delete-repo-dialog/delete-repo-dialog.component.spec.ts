import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRepoDialogComponent } from './delete-repo-dialog.component';

describe('DeleteRepoDialogComponent', () => {
  let component: DeleteRepoDialogComponent;
  let fixture: ComponentFixture<DeleteRepoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRepoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRepoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
