import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesPorConceptoComponent } from './materiales-por-concepto.component';

describe('MaterialesPorConceptoComponent', () => {
  let component: MaterialesPorConceptoComponent;
  let fixture: ComponentFixture<MaterialesPorConceptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialesPorConceptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesPorConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
