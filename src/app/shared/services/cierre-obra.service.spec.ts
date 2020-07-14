import { TestBed } from '@angular/core/testing';

import { CierreObraService } from './cierre-obra.service';

describe('CierreObraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CierreObraService = TestBed.get(CierreObraService);
    expect(service).toBeTruthy();
  });
});
