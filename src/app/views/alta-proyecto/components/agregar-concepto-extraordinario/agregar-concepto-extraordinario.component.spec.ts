import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConceptoExtraordinarioComponent } from './agregar-concepto-extraordinario.component';

describe('AgregarConceptoExtraordinarioComponent', () => {
  let component: AgregarConceptoExtraordinarioComponent;
  let fixture: ComponentFixture<AgregarConceptoExtraordinarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarConceptoExtraordinarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarConceptoExtraordinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
