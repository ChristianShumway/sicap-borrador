import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCerrarComponent } from './modal-cerrar.component';

describe('ModalCerrarComponent', () => {
  let component: ModalCerrarComponent;
  let fixture: ComponentFixture<ModalCerrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCerrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCerrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
