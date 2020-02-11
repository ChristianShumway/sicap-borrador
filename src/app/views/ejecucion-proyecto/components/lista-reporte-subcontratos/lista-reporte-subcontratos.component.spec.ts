import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteSubcontratosComponent } from './lista-reporte-subcontratos.component';

describe('ListaReporteSubcontratosComponent', () => {
  let component: ListaReporteSubcontratosComponent;
  let fixture: ComponentFixture<ListaReporteSubcontratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteSubcontratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteSubcontratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
