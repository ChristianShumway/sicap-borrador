import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSubcontratosComponent } from './reporte-subcontratos.component';

describe('ReporteSubcontratosComponent', () => {
  let component: ReporteSubcontratosComponent;
  let fixture: ComponentFixture<ReporteSubcontratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteSubcontratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSubcontratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
