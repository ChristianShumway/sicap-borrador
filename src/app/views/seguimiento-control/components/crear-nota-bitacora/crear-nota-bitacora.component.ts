import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { ObraSupervisionService } from '../../../../shared/services/obra.supervision.service';
import { Obra } from './../../../../shared/models/obra';
import { ObraService } from 'app/shared/services/obra.service';
import { Observable } from 'rxjs';
import { CatalogoConceptos } from './../../../../shared/models/catalogo-conceptos';

@Component({
  selector: 'app-crear-nota-bitacora',
  templateUrl: './crear-nota-bitacora.component.html',
  styleUrls: ['./crear-nota-bitacora.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CrearNotaBitacoraComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  notaBitacora: string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  idUsuarioLogeado;
  idObra;
  catalogo: CatalogoConceptos[] = [];
  fecha = new Date();
 
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
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
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

  reportarAvance(){
    const avance = {
      nota: this.notaBitacora,
      longitud: this.longitude,
      latitude: this.latitude,
      usuarioRegista: this.idUsuarioLogeado,
      fecha: this.fecha
    }
    console.log (avance);
  }

}
