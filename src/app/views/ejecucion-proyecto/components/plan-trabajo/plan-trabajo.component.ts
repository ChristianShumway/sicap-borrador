import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { PlanTrabajoService } from '../../../../shared/services/plan-trabajo.service';
import { Obra } from './../../../../shared/models/obra';
import { ObraService } from 'app/shared/services/obra.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConceptoPlanTrabajo } from '../../../../shared/models/concepto-plan-trabajo';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PlanTrabajo } from '../../../../shared/models/plan-trabajo';

@Component({
  selector: 'app-plan-trabajo',
  templateUrl: './plan-trabajo.component.html',
  styleUrls: ['./plan-trabajo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlanTrabajoComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  idUsuarioLogeado;
  idObra;
  obra: Obra;
  catalogo: ConceptoPlanTrabajo[] = [];
  temp: ConceptoPlanTrabajo[] = [];
  fecha = new Date();
  fechaInicio;
  fechaFinal;
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');
  planTrabajoForm: FormGroup;
  permisoAcceso: boolean = false;

  public searchElementRef: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private planTrabajoService: PlanTrabajoService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.getValidations();
    this.compareTwoDates();
    this.fechaInicio = new Date(this.planTrabajoForm.controls['fechaInicio'].value);
    this.fechaFinal = new Date(this.planTrabajoForm.controls['fechaFinal'].value);
    this.fechaInicio.setDate(this.fechaInicio.getDate());
    this.fechaFinal.setDate(this.fechaFinal.getDate());
  }

  getValidations() {
    this.planTrabajoForm = new FormGroup({
      observacion: new FormControl('', Validators.required),
      fechaInicio: new FormControl(new Date(), Validators.required),
      fechaFinal: new FormControl(new Date(), Validators.required),
    })
  }

  public onFechaInicio(event): void {
    this.fechaInicio = event.value;
    this.compareTwoDates();
  }

  public onFechaFinal(event): void {
    this.fechaFinal = event.value;
    this.compareTwoDates();
  }

  compareTwoDates(){
    const controlFechaInicio = new Date(this.planTrabajoForm.controls['fechaInicio'].value);
    const controlFechaFin = new Date(this.planTrabajoForm.controls['fechaFinal'].value);

    if( controlFechaFin < controlFechaInicio){
      this.error={isError:true,errorMessage:'Fecha inicial del plan de trabajo no puede ser mayor a la fecha final del plan de trabajo'};
      this.planTrabajoForm.controls['fechaInicio'].setValue(new Date(this.planTrabajoForm.controls['fechaFinal'].value));
      this.fechaInicio =  new Date(this.planTrabajoForm.controls['fechaInicio'].value);
      const controlFechaInicio = new Date(this.planTrabajoForm.controls['fechaInicio'].value);
      const controlFechaFin = new Date(this.planTrabajoForm.controls['fechaFinal'].value);
    } else {
      this.error={isError:false};
    }
  }

  getObra() {
    this.activatedRoute.params.subscribe((data: Params) => {
      if (data) {
        this.idObra = data.id;
        this.obraService.getObraObservable(this.idObra);
        this.obraObs$ = this.obraService.getDataObra();

        this.obraService.getObra(this.idObra).subscribe(
          (obra: Obra) => this.obra = obra,
          error => console.log(error)
        );
        
        this.obraService.getDataObra().subscribe(data => {
          if (data !== null) {
            this.validateAccessObra(data.supervisor);
          }
        });
        // this.getConceptsToPlan();
      }
    })
  }

  validateAccessObra(supervisores) {
    // console.log(supervisores);
    let idSupervisores = [];
    supervisores.map(supervisor => {
      idSupervisores.push(supervisor.idUsuario);
    });
    const idExistente = idSupervisores.find(id => id === this.idUsuarioLogeado);
    // console.log(idExistente);
    if (!idExistente) {
      this.permisoAcceso = false;
      // this.router.navigate(['/dashboard']);
      // this.useAlerts('No tienes acceso a generar plan de trabajo de esta obra', ' ', 'error-dialog');
    } else {
      this.permisoAcceso = true;
      this.getConceptsToPlan();
    }
  }

  getConceptsToPlan(){
    this.activatedRoute.params.subscribe((data: Params) => {
      if (data) {
        this.idObra = data.id;
        this.planTrabajoService.getConceptsByWorkPlan(this.idObra).subscribe(
          (catalog: ConceptoPlanTrabajo[]) => {
            this.catalogo = catalog;
            this.temp = catalog;
            // console.log(this.catalogo);
          },
          error => console.log(error)
        )
      }
    });
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    if(!rows.length){
      this.useAlerts('No se encontraron conceptos con esta referencia', ' ', 'error-dialog');
    } else {
      this.useAlerts(`Fueron encontrados ${rows.length} conceptos con esta referencia`, ' ', 'success-dialog');
    }

    this.catalogo = rows;
  }

  reportarAvance() {
    if (this.planTrabajoForm.valid) {
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);
      const newCatalog: ConceptoPlanTrabajo[] = []
  
      this.catalogo.map( (concepto: ConceptoPlanTrabajo) => {
        if(concepto.cantidadPlaneada > 0){
          const conceptoModificado = {
            ...concepto,
            precioUnitarioPlaneado: concepto.precioUnitario,
            importePlaneado: concepto.precioUnitario * concepto.cantidadPlaneada
          };
          newCatalog.push(conceptoModificado);
        }
      });

      const planTrabajo: PlanTrabajo = {
        ...this.planTrabajoForm.value,
        fechaInicio: nuevaFechaInicio,
        fechaFinal: nuevaFechaFin,
        idObra: parseInt(this.idObra),
        idUsuarioModifico: this.idUsuarioLogeado,
        viewConceptWorkPlan: newCatalog,
      };
      console.log(planTrabajo);

      this.planTrabajoService.addWorkPlan(planTrabajo).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/ejecucion-proyecto/proyectos/plan-trabajo']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        },
        error => this.useAlerts(error.message, ' ', 'error-dialog')
      );
    }
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
