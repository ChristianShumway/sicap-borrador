import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcanceResumenSubcontratoComponent } from './alcance-resumen-subcontrato.component';

describe('AlcanceResumenSubcontratoComponent', () => {
  let component: AlcanceResumenSubcontratoComponent;
  let fixture: ComponentFixture<AlcanceResumenSubcontratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcanceResumenSubcontratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcanceResumenSubcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
