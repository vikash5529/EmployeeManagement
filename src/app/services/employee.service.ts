import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private storageService: StorageService, private httpClient: HttpClient) {
    if (!this.storageService.get('employeeData')) {
      this.populateEmployeeData();
    }
  }

  getEmployeeData(): Array<Employee> {
    return this.storageService.get('employeeData');
  }
  populateEmployeeData() {
    this.httpClient.get<Array<Employee>>('assets/employeeList.json').subscribe(response => {
      const employeeData: Array<Employee> = response;
      this.storageService.set('employeeData', employeeData);
    });
  }
}
