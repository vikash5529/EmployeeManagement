import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDialogComponent } from '../dialog/edit-employee-dialog/edit-employee-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeDataSubject: BehaviorSubject<Array<Employee>> = new BehaviorSubject(null);
  private employeeData: Array<Employee> = [];

  public employeeDataObservable = this.employeeDataSubject.asObservable();
  constructor(private storageService: StorageService, private httpClient: HttpClient, public dialog: MatDialog) {
    if (!this.storageService.get('employeeData')) {
      this.populateEmployeeData();
    } else {
      this.getEmployeeData();
      this.emitEmployeeData();
    }
  }

  public openDialogComponent(data: Employee) {
    console.log(data);
    this.dialog.open(EditEmployeeDialogComponent, {
      width: '650px',
      data
    }).afterClosed().subscribe(employeeData => this.modifyExistingData(employeeData));
  }
  public setEmployeeData(data: Partial<Employee>): void {
    const newRecord: Employee = this.createNewRecord(data);
    this.employeeData.push(newRecord);
    this.storageService.set('employeeData', this.employeeData);
    this.employeeDataSubject.next(this.employeeData);
  }

  public deleteEmployee(employeeData: Employee) {
    const employeeId = employeeData.employeeId;
    const index = this.employeeData.findIndex(data => data.employeeId === employeeId);
    this.employeeData.splice(index, 1);
    this.setdata(this.employeeData);
  }
  private getEmployeeData(): Array<Employee> {
    this.employeeData = this.storageService.get('employeeData');
    console.log(this.employeeData);
    return this.employeeData;
  }
  private modifyExistingData(employeeData: Employee) {
    if (employeeData) {
      const employeeId = employeeData.employeeId;
      const index = this.employeeData.findIndex(data => data.employeeId === employeeId);
      this.employeeData[index] = employeeData;
      this.employeeData = [...this.employeeData];
      this.setdata(this.employeeData);
    }
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
      this.setdata(employeeData);
    });
  }

  private setdata(employeeData: Array<Employee>) {
    this.storageService.set('employeeData', employeeData);
    this.emitEmployeeData();
  }
}
