import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  public createEmployeeForm: FormGroup;
  public employeeFormControls: any;
  public sucessMessage: string;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.buildForm();
    this.employeeFormControls = this.createEmployeeForm.controls;
  }

  private buildForm() {
    this.createEmployeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }
  onDateChange(date: string) {
    this.createEmployeeForm.controls.dob.patchValue(date, { emitEvent: true });
  }
  onSubmit() {
    this.sucessMessage = 'SuccessFully Created';
    const data = this.createEmployeeForm.value;
    this.employeeService.setEmployeeData(data);
  }
}
