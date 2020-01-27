import { TestBed } from '@angular/core/testing';

import { ListaPersonalService } from './lista-personal.service';

describe('ListaPersonalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaPersonalService = TestBed.get(ListaPersonalService);
    expect(service).toBeTruthy();
  });
});
