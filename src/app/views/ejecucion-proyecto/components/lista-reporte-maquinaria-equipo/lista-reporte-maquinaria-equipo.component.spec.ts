import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteMaquinariaEquipoComponent } from './lista-reporte-maquinaria-equipo.component';

describe('ListaReporteMaquinariaEquipoComponent', () => {
  let component: ListaReporteMaquinariaEquipoComponent;
  let fixture: ComponentFixture<ListaReporteMaquinariaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteMaquinariaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteMaquinariaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
