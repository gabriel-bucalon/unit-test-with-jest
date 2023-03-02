import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormFilled } from 'src/types/FormSign';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  employees: Array<FormFilled> = [];

  constructor(private employeeService: EmployeeService) {}

  async ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.employeeService.getPersonList().subscribe(res => {
      this.employees = res;
    }, error => console.log(error));
  }

  removePerson(form: FormFilled): void {
    console.log(this.employees, form);
    if (form.id) {
      this.employeeService.deletePerson(form.id).subscribe(() => {
        const index = this.employees.findIndex(employee => employee.id === form.id);
        if (index > -1) {
          this.employees.splice(index, 1);
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
