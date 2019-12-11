import { TestBed } from '@angular/core/testing';

import { CatalogoConceptosService } from './catalogo-conceptos.service';

describe('CatalogoConceptosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatalogoConceptosService = TestBed.get(CatalogoConceptosService);
    expect(service).toBeTruthy();
  });
});
