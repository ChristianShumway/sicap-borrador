import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIngresosEgresosComponent } from './reporte-ingresos-egresos.component';

describe('ReporteIngresosEgresosComponent', () => {
  let component: ReporteIngresosEgresosComponent;
  let fixture: ComponentFixture<ReporteIngresosEgresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteIngresosEgresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteIngresosEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
