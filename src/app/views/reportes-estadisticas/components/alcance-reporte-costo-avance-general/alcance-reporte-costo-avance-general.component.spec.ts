import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcanceReporteCostoAvanceGeneralComponent } from './alcance-reporte-costo-avance-general.component';

describe('AlcanceReporteCostoAvanceGeneralComponent', () => {
  let component: AlcanceReporteCostoAvanceGeneralComponent;
  let fixture: ComponentFixture<AlcanceReporteCostoAvanceGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcanceReporteCostoAvanceGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcanceReporteCostoAvanceGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
