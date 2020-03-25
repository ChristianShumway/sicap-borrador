import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarSolicitudesComponent } from './validar-solicitudes.component';

describe('ValidarSolicitudesComponent', () => {
  let component: ValidarSolicitudesComponent;
  let fixture: ComponentFixture<ValidarSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
