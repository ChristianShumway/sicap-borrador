import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url = 'http://108.175.5.160:8080/Sicap/dashboard/autenticacion/';
  constructor() { }
}
