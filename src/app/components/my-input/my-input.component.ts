import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss']
})

export class MyInputComponent {
  @Input() label: string = ""

  @Output() sendData = new EventEmitter<String>();

  sendDataToParent(event: Event){
    this.sendData.emit((event.target as HTMLSelectElement).value);
  }

}
