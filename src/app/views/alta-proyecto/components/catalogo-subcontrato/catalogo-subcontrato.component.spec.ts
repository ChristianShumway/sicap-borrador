import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSubcontratoComponent } from './catalogo-subcontrato.component';

describe('CatalogoSubcontratoComponent', () => {
  let component: CatalogoSubcontratoComponent;
  let fixture: ComponentFixture<CatalogoSubcontratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoSubcontratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoSubcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
