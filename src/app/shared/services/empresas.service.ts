import { Injectable } from '@angular/core';
import { Empresa } from './../models/empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEmpresas() {
    return this.http.get<Empresa[]>(`${environment.apiURL}/catalog/getAllCompanies`);
  };

  getAllEmpresasActive(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${environment.apiURL}/catalog/getSelectCompanies`)
  }

  getEmpresa(idEmpresa: number){
    return this.http.get<Empresa>(`${environment.apiURL}/catalog/getCompanyByID/${idEmpresa}`);
  }

  createEmpresa(newCompany): Observable<Empresa>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Empresa>(`${environment.apiURL}/catalog/createCompany`, JSON.stringify(newCompany), { headers: headerss});
  }

  updateEmpresa(company: Partial<Empresa>): Observable<Empresa>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Empresa>(`${environment.apiURL}/catalog/updateCompany`, JSON.stringify(company), { headers: headerss});
  }

  deleteEmpresa(company: Partial<Empresa>): Observable<Empresa>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Empresa>(`${environment.apiURL}/catalog/deleteCompany`, JSON.stringify(company), { headers: headerss});
  }
}
