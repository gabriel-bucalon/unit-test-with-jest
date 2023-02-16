import { Injectable } from '@angular/core';
import { FormFilled } from 'src/types/FormSign';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  personList: Array<FormFilled> = [];
  constructor(private http: HttpClient) { }

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

  private getPersonList() {
    this.http.get('http://localhost:3000/personList')
      .subscribe(
        (res: any) => {
          this.personList = res;
          console.log('get person list call from db.json', this.personList);
        },
        (err: any) => console.error(err)
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
