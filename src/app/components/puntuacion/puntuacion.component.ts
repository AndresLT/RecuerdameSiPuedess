import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.css']
})
export class PuntuacionComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'personaje', 'tiempo'];
  dataSource = this.storageServ.getArray('puntuacion');
  constructor(public storageServ: StorageService) { }

  ngOnInit(): void {
    console.log(this.dataSource);
    
  }

}
