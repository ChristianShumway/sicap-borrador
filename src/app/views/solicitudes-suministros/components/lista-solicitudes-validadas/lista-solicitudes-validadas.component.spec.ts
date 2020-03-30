import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolicitudesValidadasComponent } from './lista-solicitudes-validadas.component';

describe('ListaSolicitudesValidadasComponent', () => {
  let component: ListaSolicitudesValidadasComponent;
  let fixture: ComponentFixture<ListaSolicitudesValidadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSolicitudesValidadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSolicitudesValidadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
