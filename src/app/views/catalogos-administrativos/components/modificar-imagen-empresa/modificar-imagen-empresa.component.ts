import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empresa } from './../../../../shared/models/empresa';
import { EmpresasService } from '../../../../shared/services/empresas.service';
import { environment } from './../../../../../environments/environment.prod';

@Component({
  selector: 'app-modificar-imagen-empresa',
  templateUrl: './modificar-imagen-empresa.component.html',
  styleUrls: ['./modificar-imagen-empresa.component.scss']
})
export class ModificarImagenEmpresaComponent implements OnInit {
  
  empresa: Empresa;
  public uploader: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  public hasBaseDropZoneOver: boolean = false;
  console = console;
  empresaId;
  rutaImg: string;

  constructor(
    private empresasService: EmpresasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCompany();
    this.rutaImg = environment.imgRUL;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // getCompany(){
  //   this.activatedRoute.params.subscribe( (data: Params) => {
  //     const idCompany = data.id;
  //     if(idCompany) {
  //       // this.empresa = this.empresasService.getEmpresa(idCompany);
  //     }
  //   })
  // }

  getCompany() {
    this.activatedRoute.params.subscribe((data: Params) => {
       this.empresaId = data.id;
      if (this.empresaId) {
        // this.empresa = this.empresasService.getEmpresa(empresaId);
        this.empresasService.getEmpresa(this.empresaId).subscribe(
          ( (empresa: Empresa) => {
            console.log(empresa);
            this.empresa = empresa;
            // this.updateCompanyForm.patchValue(empresa);
          }),
          (error => console.log(error))
        );
      }
    })
  }
}
