import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAutorizarOrdenTrabajoComponent } from './modal-autorizar-orden-trabajo.component';

describe('ModalAutorizarOrdenTrabajoComponent', () => {
  let component: ModalAutorizarOrdenTrabajoComponent;
  let fixture: ComponentFixture<ModalAutorizarOrdenTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAutorizarOrdenTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAutorizarOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
