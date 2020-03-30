import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarOrdenPagoRecursosComponent } from './generar-orden-pago-recursos.component';

describe('GenerarOrdenPagoRecursosComponent', () => {
  let component: GenerarOrdenPagoRecursosComponent;
  let fixture: ComponentFixture<GenerarOrdenPagoRecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarOrdenPagoRecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarOrdenPagoRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
