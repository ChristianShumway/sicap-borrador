import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarVehiculosComponent } from './solicitar-vehiculos.component';

describe('SolicitarVehiculosComponent', () => {
  let component: SolicitarVehiculosComponent;
  let fixture: ComponentFixture<SolicitarVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
