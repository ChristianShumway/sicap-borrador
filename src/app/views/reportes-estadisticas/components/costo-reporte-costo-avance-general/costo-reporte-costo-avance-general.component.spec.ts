import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoReporteCostoAvanceGeneralComponent } from './costo-reporte-costo-avance-general.component';

describe('CostoReporteCostoAvanceGeneralComponent', () => {
  let component: CostoReporteCostoAvanceGeneralComponent;
  let fixture: ComponentFixture<CostoReporteCostoAvanceGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoReporteCostoAvanceGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoReporteCostoAvanceGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
