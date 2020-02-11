import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReporteSubcontratosComponent } from './modificar-reporte-subcontratos.component';

describe('ModificarReporteSubcontratosComponent', () => {
  let component: ModificarReporteSubcontratosComponent;
  let fixture: ComponentFixture<ModificarReporteSubcontratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarReporteSubcontratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarReporteSubcontratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
