import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteIngresosEgresosComponent } from './lista-reporte-ingresos-egresos.component';

describe('ListaReporteIngresosEgresosComponent', () => {
  let component: ListaReporteIngresosEgresosComponent;
  let fixture: ComponentFixture<ListaReporteIngresosEgresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteIngresosEgresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteIngresosEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
