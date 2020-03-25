import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDatosSolicitudComponent } from './modal-datos-solicitud.component';

describe('ModalDatosSolicitudComponent', () => {
  let component: ModalDatosSolicitudComponent;
  let fixture: ComponentFixture<ModalDatosSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDatosSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
