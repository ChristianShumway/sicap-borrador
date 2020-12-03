import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelacionComponent } from './modal-cancelacion.component';

describe('ModalCancelacionComponent', () => {
  let component: ModalCancelacionComponent;
  let fixture: ComponentFixture<ModalCancelacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCancelacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCancelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
