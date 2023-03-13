import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
//import { GifsPageComponent } from "../../gifs/busqueda";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private gifsService : GifsService) {}
  
  get historial() : string[] {
    return this.gifsService.historial;
  }

  buscar(query : string) {
    this.gifsService.buscarGifs(query);
  }


}
