import { TestBed } from '@angular/core/testing';

import { ValidacionReporteService } from './validacion-reporte.service';

describe('ValidacionReporteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidacionReporteService = TestBed.get(ValidacionReporteService);
    expect(service).toBeTruthy();
  });
});
