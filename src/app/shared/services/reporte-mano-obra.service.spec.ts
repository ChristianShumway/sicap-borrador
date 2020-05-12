import { TestBed } from '@angular/core/testing';

import { ReporteManoObraService } from './reporte-mano-obra.service';

describe('ReporteManoObraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteManoObraService = TestBed.get(ReporteManoObraService);
    expect(service).toBeTruthy();
  });
});
