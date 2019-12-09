import { Injectable } from '@angular/core';
import { Obra } from './../models/obra';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  obrasTemp: Obra[] = [
    {
      idObra: 1,
      idEmpresa: 1,
      idCliente: 1,
      noContrato: '9400100192',
      nombreObra: 'DJ-O-CAS-058-2019 RECALIBRACION DE 5 KM 1C-3F-4H ACSR Y 2 KM CABLE MULTIPLE 3+1 3/0-1/0 ACSR, EN EL MUNICIPIO DE CHAPALA JALISCO',
      presupuestoTotal: 3448993.89,
      fechaInicio: '2019-01-01',
      fechaFin: '2019-02-02',
      plazoEjecucion: 120,
      lugarTrabajo: 'Chapala, Jalisco',
      idSupervisor: 1,
      idDestajista: 1,
      presupuestoMaterial: 2266015.35,
      presupuestoManoObra: 408800.00,
      presupuestoMaquinaria: 103923.48,
      presupuestoDestajo: 0
    }
  ];

  constructor(
    private http: HttpClient
  ) { }

  getObras(): Observable<Obra[]>  {
    return this.http.get<Obra[]>(`${environment.apiURL}/obra/getAllObra`); 
  }

  getObra(id: number): Observable<Obra>{
    return this.http.get<Obra>(`${environment.apiURL}/obra/getObraByID/${id}`);
  }

  createObra(obra): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/createObra`, JSON.stringify(obra), { headers: headerss});
  }

  updateObra(obra: Partial<Obra>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/updateObra`, JSON.stringify(obra), { headers: headerss});
  }

  deleteObra(obra: Partial<Obra>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/deleteObra`, JSON.stringify(obra), { headers: headerss});
  }


}
