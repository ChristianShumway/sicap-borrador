import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasReporteCostoAvanceGeneralComponent } from './graficas-reporte-costo-avance-general.component';

describe('GraficasReporteCostoAvanceGeneralComponent', () => {
  let component: GraficasReporteCostoAvanceGeneralComponent;
  let fixture: ComponentFixture<GraficasReporteCostoAvanceGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasReporteCostoAvanceGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasReporteCostoAvanceGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
