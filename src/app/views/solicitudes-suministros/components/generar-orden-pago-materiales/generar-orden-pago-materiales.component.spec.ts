import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarOrdenPagoMaterialesComponent } from './generar-orden-pago-materiales.component';

describe('GenerarOrdenPagoMaterialesComponent', () => {
  let component: GenerarOrdenPagoMaterialesComponent;
  let fixture: ComponentFixture<GenerarOrdenPagoMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarOrdenPagoMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarOrdenPagoMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
