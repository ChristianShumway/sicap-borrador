import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMontoProgramadoComponent } from './modificar-monto-programado.component';

describe('ModificarMontoProgramadoComponent', () => {
  let component: ModificarMontoProgramadoComponent;
  let fixture: ComponentFixture<ModificarMontoProgramadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarMontoProgramadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMontoProgramadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
