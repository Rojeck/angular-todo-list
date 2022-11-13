import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  get(key: string): any{
    try {
      const data: any = window.localStorage.getItem(key);
      return JSON.parse(data)
    } catch (error) {
      console.error("Error getting item from local storage: " + error)
      return null;
    }
  }
  set(key: string, data: any): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error("Error setting item to local storage: " + error)
    }
  }
  remove(key: string): boolean {
    try {
      window.localStorage.removeItem(key)
      return true;
    } catch (error) {
      console.error("Error setting item to local storage: " + error)
      return false;
    }
  }
}
