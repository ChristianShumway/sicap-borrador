import { TestBed } from '@angular/core/testing';

import { PlanTrabajoService } from './plan-trabajo.service';

describe('PlanTrabajoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanTrabajoService = TestBed.get(PlanTrabajoService);
    expect(service).toBeTruthy();
  });
});
