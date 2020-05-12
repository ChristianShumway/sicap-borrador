import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteManoObraComponent } from './lista-reporte-mano-obra.component';

describe('ListaReporteManoObraComponent', () => {
  let component: ListaReporteManoObraComponent;
  let fixture: ComponentFixture<ListaReporteManoObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteManoObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteManoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
