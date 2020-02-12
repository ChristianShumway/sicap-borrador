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
import { ReporteConceptosEjecutadosService } from '../../../../shared/services/reporte-conceptos-ejecutados.service';

import { Obra } from './../../../../shared/models/obra';
import { ReporteConceptosEjecutados } from './../../../../shared/models/reporte-conceptos-ejecutados';
import { ConceptoEjecutado } from './../../../../shared/models/concepto-ejecutado';

import { SubirEvidenciasComponent } from '../subir-evidencias/subir-evidencias.component';

@Component({
  selector: 'app-modificar-reporte-conceptos-ejecutados',
  templateUrl: './modificar-reporte-conceptos-ejecutados.component.html',
  styleUrls: ['./modificar-reporte-conceptos-ejecutados.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ModificarReporteConceptosEjecutadosComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  idUsuarioLogeado;
  idObra;
  idReporteConceptos
  fechaInicio;
  fechaFinal;
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');
  notaBitacoraForm: FormGroup;
 
  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;
  @ViewChild(AgmMap, {static: true}) map: AgmMap;

  catalogo: ConceptoEjecutado[] = [];
  temp: ConceptoEjecutado[] = [];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private reporteConceptosEjecutadosService: ReporteConceptosEjecutadosService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.getValidations();
    this.compareTwoDates();
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // this.geoCoder = new google.maps.Geocoder;
 
      // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      //   types: ["address"]
      // });

      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     //get the place result
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
      //     //verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }
      //     //set latitude, longitude and zoom
      //     this.latitude = place.geometry.location.lat();
      //     this.longitude = place.geometry.location.lng();
      //     this.zoom = 12;
      //   });
      // });
    });
  }

  getValidations(){
    this.notaBitacoraForm = new FormGroup({
      observacion: new FormControl('', Validators.required),
      latitud: new FormControl('', Validators.required),
      longitud: new FormControl('', Validators.required),
      fechaInicio: new FormControl(this.fechaInicio, Validators.required),
      fechaFinal: new FormControl(this.fechaFinal, Validators.required),
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
    const controlFechaInicio = new Date(this.notaBitacoraForm.controls['fechaInicio'].value);
    const controlFechaFin = new Date(this.notaBitacoraForm.controls['fechaFinal'].value);

    if( controlFechaFin < controlFechaInicio){
      this.error={isError:true,errorMessage:'Fecha inicial del reporte no puede ser mayor a la fecha final del mismo'};      
      this.notaBitacoraForm.controls['fechaInicio'].setValue(this.fechaFinal);
      this.fechaInicio =  new Date(this.notaBitacoraForm.controls['fechaInicio'].value);
      const controlFechaInicio = new Date(this.notaBitacoraForm.controls['fechaInicio'].value);
      const controlFechaFin = new Date(this.notaBitacoraForm.controls['fechaFinal'].value);
    } else {
      this.error={isError:false};
    }
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      console.log(data);
      if(data){
        this.idObra = data.idObra;
        this.idReporteConceptos  = data.idPlanTrabajo;

        this.obraService.getObraObservable(this.idObra);
        this.obraObs$ = this.obraService.getDataObra();
        
        this.obraService.getDataObra().subscribe( data => {
          if(data !== null){
            this.validateAccessObra(data.supervisor);
          }
        });

        // this.getConceptsToReport();
        this.getWorkPlanById();
        // this.obraSupervisionService.getCatalogObservable(this.idObra);
        // this.obraSupervisionService.getDataCatalogo().subscribe( (catalogo: CatalogoConceptos[]) => {
        //   this.catalogo = catalogo;
        //   this.temp = catalogo;
        //   console.log(catalogo);
        // })
      }
    })
  }

  getWorkPlanById(){
    this.reporteConceptosEjecutadosService.getConceptExecutedByObra(this.idObra).subscribe(
      (reporteConceptos: ReporteConceptosEjecutados[]) => {
        // console.log(reporteConceptos);
        const reporteModif = reporteConceptos.filter( (reporte: ReporteConceptosEjecutados) => reporte.idConceptoEjecutado == this.idReporteConceptos);
        // console.log(reporteModif);
        reporteModif.map( (reporte: ReporteConceptosEjecutados) => {
          let inicioString = reporte.fechaInicio;
          let finString = reporte.fechaFinal;
          this.fechaInicio = new Date(inicioString);
          this.fechaInicio.setDate(this.fechaInicio.getDate()+1);
          this.fechaFinal = new Date(finString);
          this.fechaFinal.setDate(this.fechaFinal.getDate()+1);
          this.notaBitacoraForm.patchValue(reporte);
          console.log(reporte);
          this.latitude = reporte.latitud;
          this.longitude = reporte.longitud;
          this.catalogo = reporte.viewConceptExecuted;
          this.temp = this.catalogo;
          // console.log(this.catalogo);
        })
      }
    );
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
      this.router.navigate(['/dashboard']);
      this.useAlerts('No tienes acceso a generar reporte de conceptos ejecutados', ' ', 'error-dialog');
    }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        // this.latitude = position.coords.latitude;
        // this.longitude = position.coords.longitude;
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
      // this.defaultPos();
      this.useAlerts('Su navegador no soporta la API de geolocalización', ' ', 'error-dialog');
    }
    
    this.getAddress(this.latitude, this.longitude);
    this.zoom = 16;
    this.notaBitacoraForm.controls['latitud'].setValue(this.latitude);
    this.notaBitacoraForm.controls['longitud'].setValue(this.longitude);
    this.getAddress(this.latitude, this.longitude);

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

    this.catalogo = rows;
  }

  subirEvidencias(idConcepto): void {
    console.log(idConcepto);  

    let sheet = this.bottomSheet.open(SubirEvidenciasComponent, {
      data: {
        idConcepto,
        idObra: this.idObra,
        idUsuario: this.idUsuarioLogeado,
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
      const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);
      const newCatalog: ConceptoEjecutado[] = []
  
      this.catalogo.map( (concepto: ConceptoEjecutado) => {
        if(concepto.cantidadEjecutada > 0){
          const conceptoModificado: ConceptoEjecutado = {
            ...concepto,
            precioUnitarioEjecutado: concepto.precioUnitario,
            importeEjecutado: concepto.precioUnitario * concepto.cantidadEjecutada
          };

          newCatalog.push(conceptoModificado);
        }
      });

      const reporte: ReporteConceptosEjecutados = {
        ...this.notaBitacoraForm.value,
        idConceptoEjecutado: parseInt(this.idReporteConceptos),
        fechaInicio: nuevaFechaInicio,
        fechaFinal: nuevaFechaFin,
        idObra: parseInt(this.idObra),
        idUsuarioModifico: this.idUsuarioLogeado,
        viewConceptExecuted: newCatalog,
      };
      console.log(reporte);

      this.reporteConceptosEjecutadosService.addConceptExecuted(reporte).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/ejecucion-proyecto/proyectos/reporte-conceptos-ejecutados']);
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
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
