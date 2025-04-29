import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-details-form',
  imports: [FormsModule],
  templateUrl: './details-form.component.html',
  styleUrl: './details-form.component.css'
})
export class DetailsFormComponent {
  @Output('formData')formdata = new EventEmitter<{date:string,category:string,amount:number,paymentmethod:string}>();
  onSubmit(data:NgForm){
    this.formdata.emit(data.value);
  }
}
