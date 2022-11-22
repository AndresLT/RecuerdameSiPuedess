import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { PuntuacionComponent } from '../puntuacion/puntuacion.component';

export class Personaje{
  id: string | undefined;
  nombre: string | undefined;
  ext: string | undefined;
}

export class Puntuacion{
  nombre: string | undefined;
  personaje: string | undefined;
  tiempo: string | undefined;
  milisegundos: number | undefined;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  horaInicial: Date;
  horaFinal: Date;
  jugando: boolean = false;

  personajeSeleccionado: Personaje;
  pathImage: string = '';
  
  personajes: Personaje[] = [{id:"1", nombre:"Panteras rosas", ext:".png"},
  {id:"2", nombre:"Burro", ext:".png"},
  {id:"3", nombre:"Burbujas", ext:".jpg"},
  {id:"4", nombre:"Goku", ext:".jpg"},
  {id:"5", nombre:"Dr.Doofenshmirtz", ext:".png"},
  {id:"6", nombre:"Catdog", ext:".png"},
  {id:"7", nombre:"Puro hueso", ext:".jpg"},
  {id:"8", nombre:"Goten", ext:".jpg"},
  {id:"9", nombre:"Mandy", ext:".JPG"},
  {id:"10", nombre:"Remy", ext:".png"},
  {id:"11", nombre:"Pocoyó", ext:".png"},
  {id:"12", nombre:"Coraje", ext:".jpg"},
  {id:"13", nombre:"Daria", ext:".png"},
  {id:"14", nombre:"Jorge el curioso", ext:".png"},
  {id:"15", nombre:"Martha, la perra que habla", ext:".png"},
  {id:"16", nombre:"Gohan", ext:".png"},
  {id:"17", nombre:"Pluto", ext:".png"},
  {id:"18", nombre:"Tom", ext:".png"},
  {id:"19", nombre:"Cat", ext:".png"},
  {id:"20", nombre:"Gato con botas", ext:".png"},
  {id:"21", nombre:"Pikachu", ext:".png"},
  {id:"22", nombre:"Almejandra", ext:".png"},
  {id:"23", nombre:"Coco", ext:".png"},
  {id:"24", nombre:"Blue", ext:".png"},
  {id:"25", nombre:"Speedy Gonzalez", ext:".png"},
  {id:"26", nombre:"Bellota", ext:".jpg"},
  {id:"27", nombre:"Tiro al blanco", ext:".png"},
  {id:"28", nombre:"Mojo Jojo", ext:".jpg"},
  {id:"29", nombre:"Lotso", ext:".JPG"},
  {id:"30", nombre:"Pokebolas", ext:".png"},
  {id:"31", nombre:"Isabella Shapiro", ext:".png"},
  {id:"32", nombre:"Nermal", ext:".png"},
  {id:"33", nombre:"Tablón", ext:".png"},
  {id:"34", nombre:"Teri", ext:".jpg"}]

  constructor(public storageServ: StorageService,private router: Router, public dialog: MatDialog) {
    this.horaInicial = new Date();
    this.horaFinal = new Date();

    this.personajeSeleccionado = new Personaje;
   }

  ngOnInit(): void {
  }

  cambiarJugador(){
    this.storageServ.deleteKey('jugador');
    this.router.navigate(['']);
  }

  iniciar(){
    this.jugando = true;
    this.horaInicial = new Date();
    console.log('Hora inicial', this.horaInicial);
    this.findPersonaje();
  }

  finalizar(){
    this.jugando = false;
    this.horaFinal = new Date();
    console.log('Hora final', this.horaFinal);
    
    var diffMs = (+this.horaFinal - +this.horaInicial); // milliseconds between now & Christmas
    let tiempoTotal = this.convertMsToTime(diffMs)
    console.log('Milisegundos de diferencia',diffMs)
    console.log('Tiempo total',this.convertMsToTime(diffMs))
    Swal.fire({
      text: 'Tu tiempo encontrando a ' + this.personajeSeleccionado.nombre + ' fue de: ' + tiempoTotal,
      icon: 'info'
    })

    var puntuacion = new Puntuacion();
    puntuacion.nombre = this.storageServ.getKey('jugador') ?? ''
    puntuacion.tiempo = tiempoTotal
    puntuacion.milisegundos = diffMs
    puntuacion.personaje = this.personajeSeleccionado.nombre

    this.storageServ.setArray(puntuacion);
  }

  convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
    
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(
      seconds,
    )}`
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  findPersonaje(){
    const pathAssets: string = '../../../assets/img/';
    this.personajeSeleccionado = this.personajes[this.getRandomInt(this.personajes.length)]
    this.pathImage = pathAssets + this.personajeSeleccionado.id + ' ' + this.personajeSeleccionado.nombre + this.personajeSeleccionado.ext
    console.log(this.personajeSeleccionado);
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  openDialog() {
    this.dialog.open(PuntuacionComponent);
  }
}
