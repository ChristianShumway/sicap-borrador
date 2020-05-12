import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLineaBaseComponent } from './modificar-linea-base.component';

describe('ModificarLineaBaseComponent', () => {
  let component: ModificarLineaBaseComponent;
  let fixture: ComponentFixture<ModificarLineaBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarLineaBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarLineaBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
