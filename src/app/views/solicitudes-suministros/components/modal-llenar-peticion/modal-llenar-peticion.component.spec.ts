import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLlenarPeticionComponent } from './modal-llenar-peticion.component';

describe('ModalLlenarPeticionComponent', () => {
  let component: ModalLlenarPeticionComponent;
  let fixture: ComponentFixture<ModalLlenarPeticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLlenarPeticionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLlenarPeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
