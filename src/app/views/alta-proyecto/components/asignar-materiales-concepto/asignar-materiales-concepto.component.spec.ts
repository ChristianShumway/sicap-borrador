import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMaterialesConceptoComponent } from './asignar-materiales-concepto.component';

describe('AsignarMaterialesConceptoComponent', () => {
  let component: AsignarMaterialesConceptoComponent;
  let fixture: ComponentFixture<AsignarMaterialesConceptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarMaterialesConceptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarMaterialesConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
