import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoMaterialesComponent } from './catalogo-materiales.component';

describe('CatalogoMaterialesComponent', () => {
  let component: CatalogoMaterialesComponent;
  let fixture: ComponentFixture<CatalogoMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
