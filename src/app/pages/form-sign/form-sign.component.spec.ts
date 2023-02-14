import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignComponent } from './form-sign.component';

describe('FormSignComponent', () => {
  let component: FormSignComponent;
  let fixture: ComponentFixture<FormSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
