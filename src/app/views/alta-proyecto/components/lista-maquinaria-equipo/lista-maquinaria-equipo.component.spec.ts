import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMaquinariaEquipoComponent } from './lista-maquinaria-equipo.component';

describe('ListaMaquinariaEquipoComponent', () => {
  let component: ListaMaquinariaEquipoComponent;
  let fixture: ComponentFixture<ListaMaquinariaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMaquinariaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMaquinariaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
