import { TestBed } from '@angular/core/testing';

import { ObraService } from './obra.service';

describe('ObraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObraService = TestBed.get(ObraService);
    expect(service).toBeTruthy();
  });
});
