import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { ObraSupervisionService } from '../../../../shared/services/obra.supervision.service';
import { Obra } from './../../../../shared/models/obra';
import { ObraService } from 'app/shared/services/obra.service';
import { Observable } from 'rxjs';
import { CatalogoConceptos } from './../../../../shared/models/catalogo-conceptos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear-nota-bitacora',
  templateUrl: './crear-nota-bitacora.component.html',
  styleUrls: ['./crear-nota-bitacora.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CrearNotaBitacoraComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  idUsuarioLogeado;
  idObra;
  catalogo: CatalogoConceptos[] = [];
  temp = [];
  fecha = new Date();
  pipe = new DatePipe('en-US');
  notaBitacoraForm: FormGroup;
 
  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private obraSupervisionService: ObraSupervisionService,
    private obraService: ObraService
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.getValidations();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  getValidations(){
    this.notaBitacoraForm = new FormGroup({
      notaBitacora: new FormControl('', Validators.required),
      latitud: new FormControl('', Validators.required),
      longitud: new FormControl('', Validators.required),
    })
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      console.log(data);
      if(data){
        this.idObra = data.id;
        this.obraService.getObraObservable(this.idObra);
        this.obraObs$ = this.obraService.getDataObra();
        this.obraService.getDataObra().subscribe( data => {
          if(data !== null){
            this.validateAccessObra(data.idSupervisor);
          }
        })
        this.obraSupervisionService.getCatalogObservable(this.idObra);
        this.obraSupervisionService.getDataCatalogo().subscribe( (catalogo: CatalogoConceptos[]) => {
          this.catalogo = catalogo;
          this.temp = catalogo;
          console.log(catalogo);
        })
      }
    })
  }

  validateAccessObra(idSupervisorObra) {
    if(idSupervisorObra !== this.idUsuarioLogeado){
      this.router.navigate(['/dashboard']);
    }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
        this.notaBitacoraForm.controls['latitud'].setValue(this.latitude);
        this.notaBitacoraForm.controls['longitud'].setValue(this.longitude);
      });
    }
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
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
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

  reportarAvance(){
    if(this.notaBitacoraForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFecha = this.pipe.transform(this.fecha, format);
      const avance = {
        ...this.notaBitacoraForm.value,
        usuarioRegista: this.idUsuarioLogeado,
        fecha: nuevaFecha
      }

      console.log (avance);
    }
  }

}
