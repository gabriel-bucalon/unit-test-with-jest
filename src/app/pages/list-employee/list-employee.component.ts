import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormFilled } from 'src/types/FormSign';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  employees: Array<FormFilled> = [];
  constructor(private employeeService: EmployeeService) {}
  
  async ngOnInit(): Promise<void> {
    this.employeeService.getPersonList().subscribe(res => {
      this.employees = res;
    });
  }

  
  
  
}
