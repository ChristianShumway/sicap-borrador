import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarImagenEmpresaComponent } from './modificar-imagen-empresa.component';

describe('ModificarImagenEmpresaComponent', () => {
  let component: ModificarImagenEmpresaComponent;
  let fixture: ComponentFixture<ModificarImagenEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarImagenEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarImagenEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
