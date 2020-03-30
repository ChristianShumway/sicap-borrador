import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarOrdenPagoVehiculosComponent } from './generar-orden-pago-vehiculos.component';

describe('GenerarOrdenPagoVehiculosComponent', () => {
  let component: GenerarOrdenPagoVehiculosComponent;
  let fixture: ComponentFixture<GenerarOrdenPagoVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarOrdenPagoVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarOrdenPagoVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
