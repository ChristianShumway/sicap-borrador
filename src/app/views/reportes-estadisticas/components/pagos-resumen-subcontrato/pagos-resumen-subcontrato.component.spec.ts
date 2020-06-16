import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosResumenSubcontratoComponent } from './pagos-resumen-subcontrato.component';

describe('PagosResumenSubcontratoComponent', () => {
  let component: PagosResumenSubcontratoComponent;
  let fixture: ComponentFixture<PagosResumenSubcontratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosResumenSubcontratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosResumenSubcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
