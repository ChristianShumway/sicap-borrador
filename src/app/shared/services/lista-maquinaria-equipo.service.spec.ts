import { TestBed } from '@angular/core/testing';

import { ListaMaquinariaEquipoService } from './lista-maquinaria-equipo.service';

describe('ListaMaquinariaEquipoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaMaquinariaEquipoService = TestBed.get(ListaMaquinariaEquipoService);
    expect(service).toBeTruthy();
  });
});
