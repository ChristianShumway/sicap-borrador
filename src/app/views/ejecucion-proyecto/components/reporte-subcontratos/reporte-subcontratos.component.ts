import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { MapsAPILoader, MouseEvent, AgmMap } from '@agm/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';

import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { ObraService } from 'app/shared/services/obra.service';
import { ReporteSubcontratoService } from '../../../../shared/services/reporte-subcontrato.service'

import { Obra } from './../../../../shared/models/obra';
import { ReporteSubcontrato } from './../../../../shared/models/reporte-subcontrato';
import { ConceptoSubcontrato } from './../../../../shared/models/concepto-subcontrato';

import { SubirEvidenciasComponent } from '../subir-evidencias/subir-evidencias.component';

@Component({
  selector: 'app-reporte-subcontratos',
  templateUrl: './reporte-subcontratos.component.html',
  styleUrls: ['./reporte-subcontratos.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReporteSubcontratosComponent implements OnInit {
  private obraObs$: Observable<Obra>;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  idUsuarioLogeado;
  obra:Obra;
  idObra;
  fechaInicio;
  // fechaFinal;
  fechaHoy = new Date();
  // error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');
  notaBitacoraForm: FormGroup;
  permisoAcceso: boolean = false;
 
  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;
  @ViewChild(AgmMap, {static: true}) map: AgmMap;

  catalogo: ConceptoSubcontrato[] = [];
  temp: ConceptoSubcontrato[] = [];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private reporteSubcontratoService: ReporteSubcontratoService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.getValidations();
    // this.compareTwoDates();
    this.fechaInicio = new Date(this.notaBitacoraForm.controls['fechaInicio'].value);
    this.fechaInicio.setDate(this.fechaInicio.getDate());
    // this.fechaFinal = new Date(this.notaBitacoraForm.controls['fechaFinal'].value);
    // this.fechaFinal.setDate(this.fechaFinal.getDate());
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
    });
  }

  getValidations(){
    this.notaBitacoraForm = new FormGroup({
      observacion: new FormControl('', Validators.required),
      latitud: new FormControl('0'),
      longitud: new FormControl('0'),
      fechaInicio: new FormControl(new Date(), Validators.required),
      // fechaFinal: new FormControl(new Date(), Validators.required),
    })
  }

  public onFechaInicio(event): void {
    this.fechaInicio = event.value;
    // this.compareTwoDates();
  }

  // public onFechaFinal(event): void {
  //   this.fechaFinal = event.value;
  //   this.compareTwoDates();
  // }

  // compareTwoDates(){
  //   const controlFechaInicio = new Date(this.notaBitacoraForm.controls['fechaInicio'].value);
  //   const controlFechaFin = new Date(this.notaBitacoraForm.controls['fechaFinal'].value);

  //   if( controlFechaFin < controlFechaInicio){
  //     this.error={isError:true,errorMessage:'Fecha inicial del reporte no puede ser mayor a la fecha final del mismo'};
  //     this.notaBitacoraForm.controls['fechaInicio'].setValue(new Date(this.notaBitacoraForm.controls['fechaFinal'].value));
  //     this.fechaInicio =  new Date(this.notaBitacoraForm.controls['fechaInicio'].value);
  //     const controlFechaInicio = new Date(this.notaBitacoraForm.controls['fechaInicio'].value);
  //     const controlFechaFin = new Date(this.notaBitacoraForm.controls['fechaFinal'].value);
  //   } else {
  //     this.error={isError:false};
  //   }
  // }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      if(data){
        this.idObra = data.id;
        this.obraService.getObraObservable(this.idObra);
        this.obraObs$ = this.obraService.getDataObra();

        this.obraService.getObra(this.idObra).subscribe(
          (obra: Obra) => this.obra = obra,
          error => console.log(error)
        );
        
        this.obraService.getDataObra().subscribe( data => {
          if(data !== null){
            this.validateAccessObra(data.supervisor);
          }
        });

        this.getConceptsToReport();
      }
    })
  }

  getConceptsToReport(){
    this.activatedRoute.params.subscribe((data: Params) => {
      if (data) {
        this.idObra = data.id;
        this.reporteSubcontratoService.getConceptsByReport(this.idObra).subscribe(
          (catalog: ConceptoSubcontrato[]) => {
            this.catalogo = catalog;
            this.temp = catalog;
            console.log(this.catalogo);
          },
          error => console.log(error)
        )
      }
    });
  }

  validateAccessObra(supervisores) {
    // console.log(supervisores);
    let idSupervisores = [];
    supervisores.map(supervisor => {
      idSupervisores.push(supervisor.idUsuario);
    });
    // console.log(idSupervisores);
    const idExistente = idSupervisores.find( id => id === this.idUsuarioLogeado);
    // console.log(idExistente);
    if(!idExistente){
      // this.router.navigate(['/dashboard']);
      // this.useAlerts('No tienes acceso a generar reporte de conceptos ejecutados', ' ', 'error-dialog');
      this.permisoAcceso = false;
    } else {
      this.permisoAcceso = true;
    }
  }

  private defaultPos(){
    this.latitude =21.862058500142656;// position.coords.latitude;
    this.longitude =-102.29690491288909; //position.coords.longitude;
    this.notaBitacoraForm.controls['latitud'].setValue(this.latitude);
    this.notaBitacoraForm.controls['longitud'].setValue(this.longitude);
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        // this.latitude =position.coords.latitude;
        // this.longitude =position.coords.longitude;
        this.defaultPos();
      }, function(objPositionError){
        
        switch (objPositionError.code){
          
          case objPositionError.PERMISSION_DENIED:
            this.useAlerts('No se ha permitido el acceso a la posición del usuario', ' ', 'error-dialog');
            break;

          case objPositionError.POSITION_UNAVAILABLE:
            this.useAlerts('No se ha podido acceder a la información de su posición', ' ', 'error-dialog');
            break;

          case objPositionError.TIMEOUT:
            this.useAlerts('El servicio ha tardado demasiado tiempo en responder', ' ', 'error-dialog');
            break;
          
          default:
            this.useAlerts('Error desconocido', ' ', 'error-dialog');
        }
      }, {
        timeout: 50000
      });
      
    } else { 
      this.defaultPos();
      this.useAlerts('Su navegador no soporta la API de geolocalización', ' ', 'error-dialog');
    }
    
    this.defaultPos();
    this.getAddress(this.latitude, this.longitude);
    this.zoom = 20;
        
    // this.notaBitacoraForm.controls['latitud'].setValue(this.latitude);
    // this.notaBitacoraForm.controls['longitud'].setValue(this.longitude);
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
    this.notaBitacoraForm.controls['latitud'].setValue(this.latitude);
    this.notaBitacoraForm.controls['longitud'].setValue(this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder();
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      //  console.log(results);
      // console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 16;
          this.address = results[0].formatted_address;
        } else {
          this.useAlerts('Resultados no encontrados', ' ', 'error-dialog');
          
        }
      } else {
        // window.alert('Geocoder fall debido a: ' + status);
        this.useAlerts(`Geocoder falló debido a ${status}`, ' ', 'error-dialog');
      }
 
    });
  }

  obtenerUbicacionCoord(event){
    let lat;
    let lon;
    
    if(event.target.name === 'latitud'){
      lat = parseFloat(event.target.value);
      lon = this.longitude;
    } else if(event.target.name === 'longitud'){
      lat = this.latitude;
      lon = parseFloat(event.target.value);
    }

    this.latitude=lat;
    this.longitude=lon;
    this.getAddress(lat, lon);

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.temp.filter(function(d) {
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

  subirEvidencias(idConcepto): void {
    const format = 'yyyy-MM-dd';
    const hoy = this.pipe.transform(this.fechaHoy, format);

    let sheet = this.bottomSheet.open(SubirEvidenciasComponent, {
      data: {
        idConcepto,
        idObra: this.idObra,
        idUsuario: this.idUsuarioLogeado,
        fechaHoy: hoy,
        tipo: 2
      }
    });

    sheet.backdropClick().subscribe( () => {
      console.log('clicked'+this.idObra);
    });  

  }

  reportarAvance() {
    if (this.notaBitacoraForm.valid) {
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
      // const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);
      const newCatalog: ConceptoSubcontrato[] = []
  
      this.catalogo.map( (concepto: ConceptoSubcontrato) => {
        if(concepto.cantidadSubContrato !== 0){
          const conceptoModificado: ConceptoSubcontrato = {
            ...concepto,
            precioUnitarioSubContrato: concepto.precio,
            importeSubContrato: concepto.precio * concepto.cantidadSubContrato
          };


          newCatalog.push(conceptoModificado);
        }
      });

      const reporte: ReporteSubcontrato = {
        ...this.notaBitacoraForm.value,
        fechaInicio: nuevaFechaInicio,
        fechaFinal: nuevaFechaInicio,
        idObra: parseInt(this.idObra),
        idUsuarioModifico: this.idUsuarioLogeado,
        viewReportSubContract: newCatalog,
      };
      console.log(reporte);

      this.reporteSubcontratoService.addReportSubcontract(reporte).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/ejecucion-proyecto/proyectos/reporte-subcontratos']);
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
