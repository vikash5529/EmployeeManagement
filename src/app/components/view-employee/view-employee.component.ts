import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  public employeeData: Array<Partial<Employee>> = [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeData = this.employeeService.getEmployeeData();
  }

}
