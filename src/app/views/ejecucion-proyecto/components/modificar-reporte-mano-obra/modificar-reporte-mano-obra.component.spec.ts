import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReporteManoObraComponent } from './modificar-reporte-mano-obra.component';

describe('ModificarReporteManoObraComponent', () => {
  let component: ModificarReporteManoObraComponent;
  let fixture: ComponentFixture<ModificarReporteManoObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarReporteManoObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarReporteManoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
