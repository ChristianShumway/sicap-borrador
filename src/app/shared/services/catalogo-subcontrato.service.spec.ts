import { TestBed } from '@angular/core/testing';

import { CatalogoSubcontratoService } from './catalogo-subcontrato.service';

describe('CatalogoSubcontratoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatalogoSubcontratoService = TestBed.get(CatalogoSubcontratoService);
    expect(service).toBeTruthy();
  });
});
