import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public employeeData: Array<Partial<Employee>> = [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeData = this.employeeService.getEmployeeData();
  }

}
