import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from '../employee.service';
import { FormFilled } from 'src/types/FormSign';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('postPersonList', () => {
    it('should post a person and return an observable of FormFilled', () => {
      const person: FormFilled = {
        id: 1,
        name: 'John',
        address: '123 Main St',
        city: 'Anytown',
        position: 'Developer'
      };
      service.postPersonList(person).subscribe(response => {
        expect(response).toEqual(person);
      });
      const request = httpMock.expectOne(`${service.URL}`);
      expect(request.request.method).toBe('POST');
      request.flush(person);
    });
  });

  describe('deletePerson', () => {
    it('should delete a person with the given id and return an observable of FormFilled', () => {
      const id = 1;
      const person: FormFilled = {
        id: id,
        name: 'John',
        address: '123 Main St',
        city: 'Anytown',
        position: 'Developer'
      };
      service.deletePerson(id).subscribe(response => {
        expect(response).toEqual(person);
      });
      const request = httpMock.expectOne(`${service.URL}/${id}`);
      expect(request.request.method).toBe('DELETE');
      request.flush(person);
    });
  });

  describe('getPersonList', () => {
    it('should get a list of persons and return an observable of FormFilled[]', () => {
      const personList: FormFilled[] = [
        {
          id: 1,
          name: 'John',
          address: '123 Main St',
          city: 'Anytown',
          position: 'Developer'
        },
        {
          id: 2,
          name: 'Jane',
          address: '456 Oak Ave',
          city: 'Othertown',
          position: 'Manager'
        }
      ];
      service.getPersonList().subscribe(response => {
        expect(response).toEqual(personList);
      });
      const request = httpMock.expectOne(`${service.URL}`);
      expect(request.request.method).toBe('GET');
      request.flush(personList);
    });

    it('should return an empty list when an error occurs', () => {
      service.getPersonList().subscribe(response => {
        expect(response).toEqual([]);
      });
      const request = httpMock.expectOne(`${service.URL}`);
      expect(request.request.method).toBe('GET');
      request.error(new ErrorEvent('network error'));
    });
  });
});
