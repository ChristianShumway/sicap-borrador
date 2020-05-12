import { TestBed } from '@angular/core/testing';

import { ReporteIngresosEgresosService } from './reporte-ingresos-egresos.service';

describe('ReporteIngresosEgresosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteIngresosEgresosService = TestBed.get(ReporteIngresosEgresosService);
    expect(service).toBeTruthy();
  });
});
