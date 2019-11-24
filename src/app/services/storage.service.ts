import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public set(key: string, data: any | Employee): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
  public clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error Deleting data from localStorage', e);
      return null;
    }
  }
}
