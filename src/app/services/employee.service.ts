import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeDataSubject: BehaviorSubject<Array<Employee>> = new BehaviorSubject(null);
  private employeeData: Array<Employee> = [];

  public employeeDataObservable = this.employeeDataSubject.asObservable();
  constructor(private storageService: StorageService, private httpClient: HttpClient) {
    if (!this.storageService.get('employeeData')) {
      this.populateEmployeeData();
    } else {
      this.getEmployeeData();
      this.emitEmployeeData();
    }
  }

  public setEmployeeData(data: Partial<Employee>): void {
    const newRecord: Employee = this.createNewRecord(data);
    this.employeeData.push(newRecord);
    this.storageService.set('employeeData', this.employeeData);
    this.employeeDataSubject.next(this.employeeData);
  }

  private getEmployeeData(): Array<Employee> {
    this.employeeData = this.storageService.get('employeeData');
    return this.employeeData;
  }
  private emitEmployeeData() {
    this.employeeDataSubject.next(this.employeeData);
  }
  private createNewRecord(data: Partial<Employee>): Employee {
    const lastIndex = this.getEmployeeData().length - 1;
    const employeeData = this.getEmployeeData();
    const employeeId = employeeData[lastIndex].employeeId + 1;
    return { employeeId, ...data } as Employee;
  }

  private populateEmployeeData() {
    this.httpClient.get<Array<Employee>>('assets/employeeList.json').subscribe(response => {
      const employeeData: Array<Employee> = response;
      this.storageService.set('employeeData', employeeData);
      this.emitEmployeeData();
    });
  }
}
