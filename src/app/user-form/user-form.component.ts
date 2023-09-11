import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../email-validator.directive';

interface IUser {
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  reactiveForm! : FormGroup;
  user! : IUser;

  constructor() {
    this.user = {} as IUser;
  }


  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator(),
      ]),
    })
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }
  get email() {
    return this.reactiveForm.get('email')!;
  }

  public validate(): void {
    if (this.reactiveForm.invalid){
      for (const control of Object.keys(this.reactiveForm.controls)){
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.user = this.reactiveForm.value;

    console.info('Nome:', this.user.name);
    console.info('Email:', this.user.email);

  }

}
