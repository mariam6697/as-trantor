import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayColorComponent } from './display-color.component';

describe('DisplayColorComponent', () => {
  let component: DisplayColorComponent;
  let fixture: ComponentFixture<DisplayColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
