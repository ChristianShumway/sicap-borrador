import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReporteIngresosEgresosComponent } from './modificar-reporte-ingresos-egresos.component';

describe('ModificarReporteIngresosEgresosComponent', () => {
  let component: ModificarReporteIngresosEgresosComponent;
  let fixture: ComponentFixture<ModificarReporteIngresosEgresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarReporteIngresosEgresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarReporteIngresosEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
