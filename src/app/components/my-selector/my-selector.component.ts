import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'my-selector',
  templateUrl: './my-selector.component.html',
  styleUrls: ['./my-selector.component.scss']
})
export class MySelectorComponent {
  @Input() label: string = "";
  @Input() values: Array<string> = [];

  @Output() sendData = new EventEmitter<String>();
  sendDataToParant(event: Event){
    if(event.target) {
      this.sendData.emit((event.target as HTMLSelectElement).value);
    }
  }
}
