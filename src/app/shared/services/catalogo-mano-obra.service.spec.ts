import { TestBed } from '@angular/core/testing';

import { CatalogoManoObraService } from './catalogo-mano-obra.service';

describe('CatalogoManoObraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatalogoManoObraService = TestBed.get(CatalogoManoObraService);
    expect(service).toBeTruthy();
  });
});
