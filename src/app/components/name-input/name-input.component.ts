import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css']
})
export class NameInputComponent implements OnInit {

  name: string = '';
  nameForm =  new FormGroup({
    name: new FormControl('')
  })

  constructor(public storageServ: StorageService, public router: Router) { 
  }

  ngOnInit(): void {
  }

  play(){
    if(!this.nameForm.get('name')?.value){
      Swal.fire({
        text:'Debes ingresar un nombre!',
        icon: 'warning',
      })
    }else{
      this.storageServ.setKey('jugador',this.nameForm.get('name')?.value ?? '');
      this.router.navigate(['play']);
    }
    
  }
}
