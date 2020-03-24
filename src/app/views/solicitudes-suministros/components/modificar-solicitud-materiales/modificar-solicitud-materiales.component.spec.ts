import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSolicitudMaterialesComponent } from './modificar-solicitud-materiales.component';

describe('ModificarSolicitudMaterialesComponent', () => {
  let component: ModificarSolicitudMaterialesComponent;
  let fixture: ComponentFixture<ModificarSolicitudMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarSolicitudMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarSolicitudMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
