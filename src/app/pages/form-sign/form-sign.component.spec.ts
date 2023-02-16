import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSignComponent } from './form-sign.component';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormFilled } from 'src/types/FormSign';

describe('FormSignComponent', () => {
  let component: FormSignComponent;
  let fixture: ComponentFixture<FormSignComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSignComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ EmployeeService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSignComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a person to the list', () => {
    const person: FormFilled = {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      position: 'Developer'
    };

    component.datasCaptured = person;
    const expectedPersonList = [...component.employeeService.personList, person];

    component.calledWindow();

    const req = httpTestingController.expectOne('http://localhost:3000/personList');
    expect(req.request.method).toEqual('POST');
    req.flush({}); // Simulate successful response

    expect(component.employeeService.personList).toEqual(expectedPersonList);
  });

  it('should disable the form when required fields are missing', () => {
    const emptyForm: FormFilled = {
      name: '',
      address: '',
      city: '',
      position: '',
    };

    component.datasCaptured = emptyForm;
    expect(component.formIsDisabled()).toBe(true);

    const partiallyFilledForm: FormFilled = {
      name: 'John Doe',
      address: '123 Main St',
      city: '',
      position: '',
    };

    component.datasCaptured = partiallyFilledForm;
    expect(component.formIsDisabled()).toBe(true);

    const fullyFilledForm: FormFilled = {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      position: 'Developer',
    };

    component.datasCaptured = fullyFilledForm;
    expect(component.formIsDisabled()).toBe(false);
  });
});