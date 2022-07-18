import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraImagesComponent } from './extra-images.component';

describe('ExtraImagesComponent', () => {
  let component: ExtraImagesComponent;
  let fixture: ComponentFixture<ExtraImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
