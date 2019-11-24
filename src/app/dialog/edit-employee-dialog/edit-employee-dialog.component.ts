import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.scss']
})
export class EditEmployeeDialogComponent implements OnInit {
  public editEmployeeForm: FormGroup;
  public employeeFormControls: any;
  public sucessMessage: string;
  private formattedDate: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee, private dialogRef: MatDialogRef<EditEmployeeDialogComponent>) { }

  ngOnInit() {
    this.buildForm();
    this.employeeFormControls = this.editEmployeeForm.controls;
  }

  private buildForm() {
    this.editEmployeeForm = new FormGroup({
      firstName: new FormControl(this.data.firstName, Validators.required),
      lastName: new FormControl(this.data.lastName, Validators.required),
      phoneNumber: new FormControl(this.data.phoneNumber, [Validators.required, Validators.pattern('^[0-9]*$')]),
      age: new FormControl(this.data.age, [Validators.required, Validators.pattern('^[0-9]*$')]),
      dob: new FormControl(new Date(this.data.dob).toISOString(), Validators.required),
      gender: new FormControl(this.data.gender, Validators.required),
    });
  }
  onDateChange(date: string) {
    this.formattedDate = date;
  }
  onSubmit() {
    this.sucessMessage = `SuccessFully Edited!!
                           Popup Will close after 2 seconds`;
    const employeeId = this.data.employeeId;
    const data: Employee = { employeeId, ...this.editEmployeeForm.value };
    data.dob = this.formattedDate ? this.formattedDate : this.data.dob;
    setTimeout(() => {
      this.dialogRef.close(data);
    }, 1500);
  }
}
