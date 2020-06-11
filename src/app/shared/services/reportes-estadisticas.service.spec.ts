import { TestBed } from '@angular/core/testing';

import { ReportesEstadisticasService } from './reportes-estadisticas.service';

describe('ReportesEstadisticasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportesEstadisticasService = TestBed.get(ReportesEstadisticasService);
    expect(service).toBeTruthy();
  });
});
