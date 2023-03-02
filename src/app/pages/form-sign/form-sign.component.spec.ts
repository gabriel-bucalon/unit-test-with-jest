import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSignComponent } from './form-sign.component';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormFilled } from 'src/types/FormSign';

describe('FormSignComponent', () => {
  let component: FormSignComponent;
  let fixture: ComponentFixture<FormSignComponent>;
  let employeeService: EmployeeService;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSignComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSignComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should set the field of the FormFilled object', () => {
    const data = 'John Doe';
    const field = 'name';
    component.getData(data, field);
    expect(component.datasCaptured[field]).toEqual(data);
  });

  it('should call the employeeService.postPersonList method when calledWindow is called', () => {
    const postPersonListSpy = jest.spyOn(employeeService, 'postPersonList');
    component.datasCaptured = {
      name: 'John Doe',
      address: 'Main Street',
      city: 'New York',
      position: 'Developer',
      id: 1
    };
    component.calledWindow();
    expect(postPersonListSpy).toHaveBeenCalledWith(component.datasCaptured);
  });

  it('should return true when form is disabled and FormFilled object is empty', () => {
    component.datasCaptured = {
      name: '',
      address: '',
      city: '',
      position: '',
      id: 0,
    };
    const formIsDisabled = component.formIsDisabled();
    expect(formIsDisabled).toBe(true);
  });

  it('should return true when form is disabled and FormFilled object has only whitespace values', () => {
    component.datasCaptured = {
      name: '   ',
      address: '   ',
      city: '   ',
      position: '   ',
      id: 0,
    };
    const formIsDisabled = component.formIsDisabled();
    expect(formIsDisabled).toBe(true);
  });

  it('should return false when form is not disabled and FormFilled object has values', () => {
    component.datasCaptured = {
      name: 'John Doe',
      address: 'Main Street',
      city: 'New York',
      position: 'Developer',
      id: 1
    };
    const formIsDisabled = component.formIsDisabled();
    expect(formIsDisabled).toBe(false);
  });


  it('should call postPersonList and log "Great!" when calledWindow is called with a valid form', () => {
    const person: FormFilled = {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      position: 'Developer',
      id: 1
    };

    component.datasCaptured = person;

    // Faz a chamada do método
    component.calledWindow();

    // Verifica se o serviço foi chamado com os argumentos corretos
    const req = httpMock.expectOne('http://localhost:3000/personList');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(person);

    // Retorna uma resposta simulando sucesso
    req.flush(person);
  });

});
