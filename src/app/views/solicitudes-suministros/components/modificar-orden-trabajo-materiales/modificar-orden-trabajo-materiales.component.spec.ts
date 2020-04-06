import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOrdenTrabajoMaterialesComponent } from './modificar-orden-trabajo-materiales.component';

describe('ModificarOrdenTrabajoMaterialesComponent', () => {
  let component: ModificarOrdenTrabajoMaterialesComponent;
  let fixture: ComponentFixture<ModificarOrdenTrabajoMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarOrdenTrabajoMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarOrdenTrabajoMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
