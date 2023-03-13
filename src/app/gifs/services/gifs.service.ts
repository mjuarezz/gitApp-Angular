import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'YhCmDiCY4G8VcFNC6LnMCo5T4AmQRlfU';
  private apiBase: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultado: Gif [] = [];


  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    // o de la siguiente manera:
    /*     
    if(localStorage.getItem('historial'))
      this._historial = JSON.parse(localStorage.getItem('historial')!);

    if(localStorage.getItem('resultado'))
      this.resultado = JSON.parse(localStorage.getItem('resultado')!); 
    */

    // o de la siguiente manera:
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];

  }

  buscarGifs(cadenaBusqueda: string = '') {
    cadenaBusqueda = cadenaBusqueda.trim().toLowerCase();
    if(!this._historial.includes(cadenaBusqueda)) {
      this._historial.unshift(cadenaBusqueda);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial));

      console.log('query=',this._historial);  
    }

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('q',cadenaBusqueda)
      .set('limit',5);

    this.http.get<SearchGifsResponse>(`${ this.apiBase }/search`,{ params })
      .subscribe ( (resp ) => {
        this.resultado = resp.data;
        localStorage.setItem('resultado',JSON.stringify(this.resultado));
      });
  }


}
