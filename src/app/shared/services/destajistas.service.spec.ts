import { TestBed } from '@angular/core/testing';

import { DestajistasService } from './destajistas.service';

describe('DestajistasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DestajistasService = TestBed.get(DestajistasService);
    expect(service).toBeTruthy();
  });
});
