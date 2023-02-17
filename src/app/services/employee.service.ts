import { Injectable } from '@angular/core';
import { FormFilled } from 'src/types/FormSign';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  personList: Array<FormFilled> = [];
  constructor(private http: HttpClient) {
    this.getPersonList();
   }

  postPersonList(person: any) {
    this.setPersonId(person);
    this.http.post('http://localhost:3000/personList', person)
      .subscribe(
        (res: any) => {
          this.addPerson(person);
          console.log('post person list call to db.json', res, this.personList);
        },
        (err: any) => console.error(err)
      );
  }

  deletePerson(id: number) {
    const url = `http://localhost:3000/personList/${id}`;
    this.http.delete(url)
      .subscribe(
        (res: any) => {
          this.getPersonList();
          console.log('remove person', id, 'from db.json', res, this.personList);
        },
        (err: any) => console.error(err)
      );
  }

  getPersonList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/personList').pipe(
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
