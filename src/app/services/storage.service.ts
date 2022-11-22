import { Injectable } from '@angular/core';
import { Puntuacion } from '../components/main/main.component';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setKey(key: string, value: string){
    localStorage.setItem(key,value);
  }

  getKey(key:string){
    return localStorage.getItem(key);
  }

  deleteKey(key:string){
    localStorage.removeItem(key);
  }

  setArray(puntuacion: Puntuacion){
    if(this.getKey('puntuacion')){
      var punt = this.getArray('puntuacion');
      punt.push(puntuacion)
      localStorage.setItem('puntuacion', JSON.stringify(punt))
    }else{
      var punt: Puntuacion[] = [{nombre:puntuacion.nombre,
        tiempo:puntuacion.tiempo,
        milisegundos:puntuacion.milisegundos,
      personaje:puntuacion.personaje}]

      localStorage.setItem('puntuacion', JSON.stringify(punt))
    }
  }

  getArray(key: string): Puntuacion[]{
    return JSON.parse(localStorage.getItem(key) ?? '');
  }

  deleteArray(key: string){

  }
}
