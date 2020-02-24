import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionValidacionConceptoComponent } from './observacion-validacion-concepto.component';

describe('ObservacionValidacionConceptoComponent', () => {
  let component: ObservacionValidacionConceptoComponent;
  let fixture: ComponentFixture<ObservacionValidacionConceptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionValidacionConceptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionValidacionConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
