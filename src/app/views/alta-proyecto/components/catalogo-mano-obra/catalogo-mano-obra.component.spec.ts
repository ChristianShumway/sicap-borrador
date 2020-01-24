import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoManoObraComponent } from './catalogo-mano-obra.component';

describe('CatalogoManoObraComponent', () => {
  let component: CatalogoManoObraComponent;
  let fixture: ComponentFixture<CatalogoManoObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoManoObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoManoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
