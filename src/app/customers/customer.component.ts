import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group(
      {
        firstName: ['',[Validators.required, Validators.minLength(3)]],
        lastName: ['',[Validators.required, Validators.maxLength(50)]],
        email: ['',[Validators.required, Validators.email]],
        phone: '',
        notification: 'email',
        sendCatalog: true
      }
    );
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text')
      phoneControl.setValidators(Validators.required);
    if (notifyVia === 'email')
      phoneControl.clearAsyncValidators();

      phoneControl.updateValueAndValidity();
  }

  save(): void {    
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
}
