
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { StorageService } from './storage.service';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { AppMaterialModule } from '../app-material.module';
import { of } from 'rxjs';
describe('EmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  let service: EmployeeService;
  let storageService: StorageService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let storageServiceSpy: jasmine.Spy;
  const mockEmployeeData: Array<Employee> = [{
    employeeId: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    phoneNumber: 892379823489,
    age: '26',
    gender: 'Female',
    dob: '11/11/19',
  }, {
    employeeId: 2,
    firstName: 'test',
    lastName: 'test',
    phoneNumber: 892379,
    age: '21',
    gender: 'Male',
    dob: '11/11/19',
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppMaterialModule],
      providers: [StorageService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    storageService = TestBed.get(StorageService);
    storageServiceSpy = spyOn(storageService, 'get').and.returnValue(mockEmployeeData);
    service = TestBed.get(EmployeeService);
  });

  it('should be created', () => {
    service = TestBed.get(EmployeeService);
    expect(service).toBeTruthy();
  });

  describe('DeleteEmployee method ', () => {
    it('should delete the employee passed as params', () => {
      expect(storageServiceSpy).toHaveBeenCalledWith('employeeData');
      service.deleteEmployee(mockEmployeeData[0]);
      service.employeeDataObservable.subscribe((employeeData: Array<Employee>) => {
        expect(employeeData).toEqual([mockEmployeeData[0]]);
      });
    });
  });
});
