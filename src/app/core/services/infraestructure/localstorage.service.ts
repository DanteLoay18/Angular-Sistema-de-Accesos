import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  set = (key: string, data: any) => {
    try {
      localStorage.setItem(key, data);
    } catch (e) {

    }
  };

  get<T>(key: string): string | null {
    try {
     return localStorage.getItem(key);
    } catch (e) {

      return null;
    }
  }

  remove = (key: string) => {
    this.removeAll(key);
    try {
      localStorage.removeItem(key);
      return ;
    } catch (e) {
      return null;
    }
  };
  removeAll = (pattern: string) => {
    localStorage.clear();
    for (const [key] of Object.entries(localStorage)) {
      if (key.startsWith(pattern)) {
        this.remove(key);
      }
    }
  };
}
