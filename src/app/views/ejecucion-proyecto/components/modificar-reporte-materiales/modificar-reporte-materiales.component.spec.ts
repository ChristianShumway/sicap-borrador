import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReporteMaterialesComponent } from './modificar-reporte-materiales.component';

describe('ModificarReporteMaterialesComponent', () => {
  let component: ModificarReporteMaterialesComponent;
  let fixture: ComponentFixture<ModificarReporteMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarReporteMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarReporteMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
