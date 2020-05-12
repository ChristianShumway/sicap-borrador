import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMaquinariaEquipoComponent } from './reporte-maquinaria-equipo.component';

describe('ReporteMaquinariaEquipoComponent', () => {
  let component: ReporteMaquinariaEquipoComponent;
  let fixture: ComponentFixture<ReporteMaquinariaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteMaquinariaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMaquinariaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
