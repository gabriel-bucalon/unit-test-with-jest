import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormFilled } from 'src/types/FormSign';

@Component({
  selector: 'app-form-sign',
  templateUrl: './form-sign.component.html',
  styleUrls: ['./form-sign.component.scss']
})
export class FormSignComponent {
  cargos:Array<string>  = ["", "Desenvolvedor", "QA", "Arquiteto"];
  datasCaptured: FormFilled = {
    name: '',
    address: '',
    city: '',
    position: '',
    id: 0,
  };

  constructor(public employeeService: EmployeeService){}

  getData(data: any, field: keyof FormFilled): void {
    console.log('data', data);
    console.log('field', field);

    this.datasCaptured[field] = data;
  }

  calledWindow(): void {
    alert(`Nome: ${this.datasCaptured.name} \n Endereço: ${this.datasCaptured.address} \n Cidade ${this.datasCaptured.city} \n Cargo ${this.datasCaptured.position}`)
    this.employeeService.postPersonList(this.datasCaptured).subscribe(response => {
      if(!response){
        return;
      }
      console.log('Great!');
    });
  }

  formIsDisabled(): Boolean {
    console.log(this.datasCaptured);
    return this.datasCaptured.name.trim() === '' || this.datasCaptured.address.trim() === ''
      || this.datasCaptured.city.trim() === '' || this.datasCaptured.position.trim() === '';
  }
}
