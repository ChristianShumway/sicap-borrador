import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReporteMaquinariaEquipoComponent } from './modificar-reporte-maquinaria-equipo.component';

describe('ModificarReporteMaquinariaEquipoComponent', () => {
  let component: ModificarReporteMaquinariaEquipoComponent;
  let fixture: ComponentFixture<ModificarReporteMaquinariaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarReporteMaquinariaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarReporteMaquinariaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
