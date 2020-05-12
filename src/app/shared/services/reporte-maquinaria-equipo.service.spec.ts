import { TestBed } from '@angular/core/testing';

import { ReporteMaquinariaEquipoService } from './reporte-maquinaria-equipo.service';

describe('ReporteMaquinariaEquipoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteMaquinariaEquipoService = TestBed.get(ReporteMaquinariaEquipoService);
    expect(service).toBeTruthy();
  });
});
