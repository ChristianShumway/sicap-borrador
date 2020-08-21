import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { CierreObraService } from '../../../../shared/services/cierre-obra.service';

import { ObraService } from '../../../../shared/services/obra.service';
import { NavigationService } from '../../../../shared/services/navigation.service';

import { CierreObra, LeccionAprendida } from '../../../../shared/models/cierre-obra';
import { ModalCerrarComponent } from '../modal-cerrar/modal-cerrar.component';
import { MatDialog } from '@angular/material';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { Usuario } from './../../../../shared/models/usuario';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-cierre-obra-data',
  templateUrl: './cierre-obra-data.component.html',
  styleUrls: ['./cierre-obra-data.component.scss']
})
export class CierreObraDataComponent implements OnInit, AfterViewInit {
  @Input() cierreObra: CierreObra;
  cierreObraForm: FormGroup;
  obraId;
  fechaInicioObra;
  fechaFinObra;
  fechaHoy = new Date();
  pipe = new DatePipe('en-US');
  error:any={isError:false,errorMessage:''};
  leccionesAprendidas: LeccionAprendida[] = [];
  leccionAprendidaText: string;

  idUsuarioLogeado; 
  nombreComponente = 'cierre-obra';
  permisosEspeciales: any[] = []; //array de objetos que contiene todos los permisos especiales del proyecto
  permisosEspecialesComponente: any[] = []; //array en el que se agregan los objetos que contiene el nombre del componente
  permisosEspecialesPermitidos: any[] = []; //array donde se agrega el nombre de las opciones a las cuales el usuario si tiene permiso
  
  constructor(
    private router: Router,
    private obraService: ObraService,
    private cierreObraService: CierreObraService,

    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    private navigationService: NavigationService,
    public dialog: MatDialog,
    private usuariosService: UsuariosService,
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getValidations();
    this.getDataUser();
  }
  
  ngAfterViewInit(){
    setTimeout( () => this.getCierreObra());
  }
  
  getCierreObra(){
    if(this.cierreObra){
      this.obraId = this.cierreObra.idObra;
      console.log(this.obraId);
  
      console.log(this.cierreObra);
      let inicioString = this.cierreObra.fechaInicio;
      let finString = this.cierreObra.fechaFin;
      this.cierreObraForm.patchValue(this.cierreObra);
      
      if(!inicioString){
        this.fechaInicioObra = new Date();
        this.cierreObraForm.controls['fechaInicio'].setValue(this.fechaInicioObra);
      } else {
        this.fechaInicioObra = new Date(inicioString);
        this.fechaInicioObra.setDate(this.fechaInicioObra.getDate()+1);
      }
      if(!finString){
        this.fechaFinObra = new Date();
        this.cierreObraForm.controls['fechaFin'].setValue(this.fechaFinObra);
      } else {
        this.fechaFinObra = new Date(finString);
        this.fechaFinObra.setDate(this.fechaFinObra.getDate()+1);
      }
  
      this.leccionesAprendidas = this.cierreObra.leccionesAprendidas;
      this.compareTwoDates();
    }    
  }

  getValidations() {
    this.cierreObraForm = new FormGroup({
      fechaInicio: new FormControl(this.fechaInicioObra, Validators.required),
      fechaFin: new FormControl(this.fechaFinObra, Validators.required),
      diasTotales: new FormControl('0', [Validators.required]),
      totalObra: new FormControl('', [Validators.required]),
      totalMaterial: new FormControl('', [Validators.required]),
      totalMaquinariaEquipo: new FormControl('', [Validators.required]),
      totalManoObra: new FormControl('', [Validators.required]),
      totalSubcontrato: new FormControl('', [Validators.required]),
      totalIndirecto: new FormControl('', [Validators.required]),
      totalFinanciamiento: new FormControl('', [Validators.required]),
      totalUtilidadEsperada: new FormControl('', [Validators.required]),
      totalCargoAdicional: new FormControl('', [Validators.required]),
    });
  }

  public onFechaInicioObra(event): void {
    this.fechaInicioObra = event.value;
    this.compareTwoDates();
  }

  public onFechaFinObra(event): void {
    this.fechaFinObra = event.value;
    this.compareTwoDates();
  }

  compareTwoDates(){
    const controlFechaInicio = new Date(this.cierreObraForm.controls['fechaInicio'].value);
    const controlFechaFin = new Date(this.cierreObraForm.controls['fechaFin'].value);
    // const controlFechaInicio = new Date(this.fechaInicioObra);
    // const controlFechaFin = new Date(this.fechaFinObra);
    this.getPlazoEjecucion(controlFechaInicio, controlFechaFin);

    if( controlFechaFin < controlFechaInicio){
        this.error={isError:true,errorMessage:'Fecha inicio de la obra no puede ser mayor a la fecha final de la obra'};
        // this.cierreObraForm.controls['fechaInicio'].setValue('');
        this.cierreObraForm.controls['fechaInicio'].setValue(this.fechaFinObra);
        const controlFechaInicio = new Date(this.cierreObraForm.controls['fechaInicio'].value);
        const controlFechaFin = this.fechaFinObra;
        this.getPlazoEjecucion(controlFechaInicio, controlFechaFin);
    } else {
      this.error={isError:false};
    }
  }

  getPlazoEjecucion(fi, ff){
    const format = 'yyyy/MM/dd';
    const nuevaFechaInicio = this.pipe.transform(fi, format);
    const nuevaFechaFin = this.pipe.transform(ff, format);
    var fechaInicio = new Date(nuevaFechaInicio).getTime();
    var fechaFin    = new Date(nuevaFechaFin).getTime();
    const plazoEjecucion = fechaFin - fechaInicio;
    this.cierreObraForm.controls['diasTotales'].setValue(Math.ceil(plazoEjecucion/(1000*60*60*24)+1));
  }

  updateObra(){
    if(this.cierreObraForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicioObra, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinObra, format);
      
      const CierreObra: CierreObra = {
        idObra: parseInt(this.obraId),
        idUsuarioModifico: this.idUsuarioLogeado,
        idCierreObra: this.cierreObra.idCierreObra,
        ...this.cierreObraForm.value,
        fechaInicio: nuevaFechaInicio,
        fechaFin: nuevaFechaFin,
        totalObra: parseFloat(this.cierreObraForm.value.totalObra),
        totalMaterial: parseFloat(this.cierreObraForm.value.totalMaterial),
        totalMaquinariaEquipo: parseFloat(this.cierreObraForm.value.totalMaquinariaEquipo),
        totalManoObra: parseFloat(this.cierreObraForm.value.totalManoObra),
        totalSubcontrato: parseFloat(this.cierreObraForm.value.totalSubcontrato),
        totalIndirecto: parseFloat(this.cierreObraForm.value.totalIndirecto),
        totalFinanciamiento: parseFloat(this.cierreObraForm.value.totalFinanciamiento),
        totalUtilidadEsperada: parseFloat(this.cierreObraForm.value.totalUtilidadEsperada),
        totalCargoAdicional: parseFloat(this.cierreObraForm.value.totalCargoAdicional),
        leccionesAprendidas: this.leccionesAprendidas
        // activo:1,
      };
      console.log(CierreObra);

      const sumaPresupuestos = CierreObra.totalMaterial + CierreObra.totalMaquinariaEquipo + CierreObra.totalManoObra + CierreObra.totalIndirecto + CierreObra.totalFinanciamiento + CierreObra.totalUtilidadEsperada + CierreObra.totalCargoAdicional;
      
      if(CierreObra.totalObra < sumaPresupuestos){
        this.useAlerts('Monto total ejecutado del contrato no puede ser menor a la suma de presupuestos', ' ', 'warning-dialog');
      } else {
        this.cierreObraService.createCierreObra(CierreObra).subscribe(
          (response => {
            if(response.estatus === '05'){
              // this.router.navigate(['/cierre-proyecto/obras']);
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          }),
          (error => {
            console.log(error);
            this.useAlerts(error.message, ' ', 'error-dialog');
          })
        );
      }

    }
  }

  getLeccionesObra(){
    this.cierreObraService.getCierreObra(this.obraId).subscribe(
    (cierre: CierreObra) => {
      this.leccionesAprendidas = cierre.leccionesAprendidas;
    },
    error => console.log(error)
    );   
  }

  addLeccion(comentario){
    if(!comentario){
      this.useAlerts('No se puede agregar lección aprendida sin contenido', ' ', 'error-dialog');
    } else {
      const dataLeccion: LeccionAprendida = {
        idLeccionAprendida: 0,
        idCierreObra: this.cierreObra.idCierreObra,
        idUsuarioModifico: this.idUsuarioLogeado,
        comentario: comentario,
      };

      // console.log(dataLeccion);
      // this.leccionesAprendidas.push(dataLeccion);
      
      this.cierreObraService.createLeccionAprendida(dataLeccion).subscribe(
        (response => {
          console.log(response);
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.leccionAprendidaText="";
            this.getLeccionesObra();
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        })
      );
    }
  }

  deleteLeccion(leccion: LeccionAprendida){
    this.cierreObraService.deleteLeaccionAprendida(leccion).subscribe(
      (response => {
        if(response.estatus === '05'){
          this.useAlerts(response.mensaje, ' ', 'success-dialog');
          this.getLeccionesObra();
        } else {
          this.useAlerts(response.mensaje, ' ', 'error-dialog');
        }
      }),
      (error => {
        console.log(error);
        this.useAlerts(error.message, ' ', 'error-dialog');
      })
    );
  }

  cerrarObra(){
    console.log(this.cierreObra);
    const dialogRef = this.dialog.open(ModalCerrarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: 'cerrar'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.cierreObraService.cerrarProyecto(this.cierreObra).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/cierre-proyecto/obras']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          },
          error => console.log(error)
        );
      }
    });
  }

  openObra(){
    console.log(this.cierreObra);
    const dialogRef = this.dialog.open(ModalCerrarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: 'abrir'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.cierreObraService.abrirProyecto(this.cierreObra).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/cierre-proyecto/obras']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          },
          error => console.log(error)
        );
      }
    });
  }

  getDataUser(){
    this.usuariosService.getUsuario(this.idUsuarioLogeado).subscribe(
      (usuario: Usuario) => this.validateEspecialPermissions(usuario.idPerfil),
      error => console.log(error)
    );
  }

  validateEspecialPermissions(idPerfil){
    console.log(idPerfil);
    this.permisosEspeciales = environment.permisosEspeciales;
    console.log(this.permisosEspeciales);

    this.permisosEspeciales.map ( permiso => {
      if( permiso.component === this.nombreComponente){
        this.permisosEspecialesComponente.push(permiso);
      }
    });

    console.log(this.permisosEspecialesComponente);

    this.permisosEspecialesComponente.map( permisoExistente => {
      this.navigationService.validatePermissions(idPerfil, permisoExistente.idOpcion).subscribe(
        (result:any) => {
          // console.log(result);
          if(result.estatus === '05'){
            this.permisosEspecialesPermitidos.push(permisoExistente.tooltip);
          }
        },
        error => console.log(error)
      );
    });

    console.log(this.permisosEspecialesPermitidos);
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
