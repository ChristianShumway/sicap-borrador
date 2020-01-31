import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionReporteSubcontratosComponent } from './validacion-reporte-subcontratos.component';

describe('ValidacionReporteSubcontratosComponent', () => {
  let component: ValidacionReporteSubcontratosComponent;
  let fixture: ComponentFixture<ValidacionReporteSubcontratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacionReporteSubcontratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionReporteSubcontratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
