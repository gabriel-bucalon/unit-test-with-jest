import { Injectable } from '@angular/core';
import { FormFilled } from 'src/types/FormSign';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  personList: Array<FormFilled> = [];
  URL = 'http://localhost:3000/personList';
  constructor(private http: HttpClient) {}

  postPersonList(person: FormFilled): Observable<FormFilled> {
    this.setPersonId(person);
    this.addPerson(person);
    return this.http.post<FormFilled>(`${this.URL}`, person)
  }

  deletePerson(id: Number): Observable<FormFilled> {
    return this.http.delete<FormFilled>(`${this.URL}/${id}`);
  }

  getPersonList(): Observable<FormFilled[]> {
    return this.http.get<FormFilled[]>(`${this.URL}`).pipe(
      map(res => res),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  private addPerson(person: FormFilled) {
    console.log('add person call', person, 'to', this.personList);
    this.personList.push(person);
  }


  private setPersonId(person: FormFilled) {
    person.id = this.personList.length + 1;
  }
}
