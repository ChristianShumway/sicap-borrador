import { Injectable } from '@angular/core';
import { Obra } from './../models/obra';
import { HttpClient } from '@angular/common/http';

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
      presupuestoTotalObra: 3448993.89,
      fechaInicio: '2019-01-01',
      fechaFin: '2019-02-02',
      lugarTrabajos: 'Chapala, Jalisco',
      idSupervisor: 1,
      idDestajista: 1,
      presupuestoMateriales: 2266015.35,
      presupuestoManoObra: 408800.00,
      presupuestoMaquinaria: 103923.48,
      presupuestoDestajo: 0
    }
  ];

  constructor(
    private http: HttpClient
  ) { }

  getObras(){

  }

  getObra(id: number){

  }

  createObra(obra: Obra){}


}
