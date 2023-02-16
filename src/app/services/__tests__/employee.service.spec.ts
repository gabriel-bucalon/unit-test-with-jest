import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from '../employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add a person to the list', () => {
    const person = {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      position: 'Developer',
    };
    service.postPersonList(person);
    const req = httpTestingController.expectOne('http://localhost:3000/personList');
    expect(req.request.method).toEqual('POST');
    req.flush(person);
    expect(service.personList).toContain(person);
  });

  it('should delete a person from the list', () => {
    const id = 1;
    const person = {
      id: id,
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      position: 'Developer',
    };
    service.personList = [person];
    service.deletePerson(id);
    const req = httpTestingController.expectOne(`http://localhost:3000/personList/${id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
    expect(service.personList[0]).not.toContain(person);
  });
});