import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empresa } from './../../../../shared/models/empresa';
import { EmpresasService } from '../../../../shared/services/empresas.service';
import { environment } from './../../../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar-imagen-empresa',
  templateUrl: './modificar-imagen-empresa.component.html',
  styleUrls: ['./modificar-imagen-empresa.component.scss']
})
export class ModificarImagenEmpresaComponent implements OnInit {
  
  empresa: Empresa;
  public uploaderLogo: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  public hasBaseDropZoneOver: boolean = false;
  console = console;
  empresaId;
  rutaImg: string;
  host: string;
  rutaServe: string;
  constructor(
    private empresasService: EmpresasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    
    this.rutaServe =environment.apiURL;
    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploaderLogo = new FileUploader({ url: this.rutaServe+'/catalog/uploadImageCompany' , autoUpload: true, headers: headers});
    this.uploaderLogo.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('idCompany' , this.empresaId);
     };
    this.uploaderLogo.uploadAll();
    
    this.uploaderLogo.onCompleteItem =  (item:any, response:any, status:any, headers:any) => {
      this.empresa.imagen = item.some.name;
      this.useAlerts('Imágen de empresa actualizada', ' ', 'success-dialog');
    };

    this.getCompany();
    this.rutaImg = environment.imageServe;
    this.host = environment.host;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getCompany() {
    this.activatedRoute.params.subscribe((data: Params) => {
       this.empresaId = data.id;
      if (this.empresaId) {
        // this.empresa = this.empresasService.getEmpresa(empresaId);
        this.empresasService.getEmpresa(this.empresaId).subscribe(
          ( (empresa: Empresa) => {
            console.log(empresa);
            this.empresa = empresa;
            console.log(this.rutaImg);
            // this.updateCompanyForm.patchValue(empresa);
          }),
          (error => console.log(error))
        );
      }
    })
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }
}
