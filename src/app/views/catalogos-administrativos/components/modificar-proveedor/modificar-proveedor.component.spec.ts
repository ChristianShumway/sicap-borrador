import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProveedorComponent } from './modificar-proveedor.component';

describe('ModificarProveedorComponent', () => {
  let component: ModificarProveedorComponent;
  let fixture: ComponentFixture<ModificarProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
