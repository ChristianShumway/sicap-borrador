import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoConceptosComponent } from './catalogo-conceptos.component';

describe('CatalogoConceptosComponent', () => {
  let component: CatalogoConceptosComponent;
  let fixture: ComponentFixture<CatalogoConceptosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoConceptosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoConceptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
