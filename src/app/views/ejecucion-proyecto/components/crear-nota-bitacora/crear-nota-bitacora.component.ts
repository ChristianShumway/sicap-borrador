import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { MapsAPILoader, MouseEvent, AgmMap } from '@agm/core';
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
 
  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;
  @ViewChild(AgmMap, {static: true}) map: AgmMap;

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
            this.validateAccessObra(data.supervisor);
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

  validateAccessObra(supervisores) {
    console.log(supervisores);
    // let idSupervisores = [];
    // supervisores.map(supervisor => {
    //   idSupervisores.push(supervisor.idUsuario);
    // });
    // console.log(idSupervisores);
    // const idExistente = idSupervisores.filter( id => id === this.idUsuarioLogeado);
    // console.log(idExistente.length);
    // if(!idExistente){
    //   this.router.navigate(['/dashboard']);
    // }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
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
          this.zoom = 16;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  obtenerUbicacionCoord(event){
    var lat;
    var lon;
    
    if(event.target.name === 'latitud'){
      lat = parseFloat(event.target.value);
      lon = this.longitude;
    } else if(event.target.name === 'longitud'){
      lat = this.longitude;
      lon = parseFloat(event.target.value);
    }

    var myLatLng = new google.maps.LatLng(lat, lon);
    console.log(myLatLng);

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

  reportarAvance(){
    if(this.notaBitacoraForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFecha = this.pipe.transform(this.fecha, format);
      const avance = {
        ...this.notaBitacoraForm.value,
        usuarioRegista: this.idUsuarioLogeado,
        fecha: nuevaFecha
      }
    }
  }

//   function initialize() {
//     var  infowindow = new google.maps.InfoWindow();
//   var mapOptions = {
//     zoom: 13,
//     center: new google.maps.LatLng(21.874649,-102.280334)
//   }
 
//   var map = new google.maps.Map(document.getElementById('map-canvas'),
//                                 mapOptions);
 
//   setMarkers(map, sucursales,infowindow);
//  }
//  function setMarkers(map, locations,infowindow) {
 
//   for (var i = 0; i < locations.length; i++) {
//     var sucursal = locations[i];
//     var myLatLng = new google.maps.LatLng(sucursal[1], sucursal[2]);
//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         icon: 'marcador.png',
//         title: sucursal[0],
//         zIndex: sucursal[4],
//  clickable: true
//     });
//  agregarLeyenda(marker,sucursal[3],infowindow,map);
 
//   }
//   }
 
//   function agregarLeyenda(marker,leyenda,infowindow,map){
 
//   google.maps.event.addListener(marker, 'click', function() {
//                 infowindow.setContent("<div class='textoMenu' style='width: 250px; height:70px;'>"+leyenda+"</div>");
//                 infowindow.open(map, marker);
//             });
//  }

}
