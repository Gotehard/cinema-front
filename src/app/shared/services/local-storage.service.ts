import { Injectable } from '@angular/core';
import {LocalStorageNames} from "../enums/local-storage-names";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  save(storeName: LocalStorageNames, data:any){
    localStorage.setItem(storeName, JSON.stringify(data));
  }

  get(storeName: LocalStorageNames){
    let dataFromStore = localStorage.getItem(storeName);
    if (!dataFromStore){
      return null;
    }
    return JSON.parse(dataFromStore);
  }

  remove(storeName: LocalStorageNames){
    localStorage.removeItem(storeName);
  }
}
