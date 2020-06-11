import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAvanceSemanalComponent } from './reporte-avance-semanal.component';

describe('ReporteAvanceSemanalComponent', () => {
  let component: ReporteAvanceSemanalComponent;
  let fixture: ComponentFixture<ReporteAvanceSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteAvanceSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAvanceSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
