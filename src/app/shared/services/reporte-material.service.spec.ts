import { TestBed } from '@angular/core/testing';

import { ReporteMaterialService } from './reporte-material.service';

describe('ReporteMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteMaterialService = TestBed.get(ReporteMaterialService);
    expect(service).toBeTruthy();
  });
});
