import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteMaterialesComponent } from './lista-reporte-materiales.component';

describe('ListaReporteMaterialesComponent', () => {
  let component: ListaReporteMaterialesComponent;
  let fixture: ComponentFixture<ListaReporteMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
