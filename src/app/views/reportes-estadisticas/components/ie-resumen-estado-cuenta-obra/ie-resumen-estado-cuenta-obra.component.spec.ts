import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IeResumenEstadoCuentaObraComponent } from './ie-resumen-estado-cuenta-obra.component';

describe('IeResumenEstadoCuentaObraComponent', () => {
  let component: IeResumenEstadoCuentaObraComponent;
  let fixture: ComponentFixture<IeResumenEstadoCuentaObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IeResumenEstadoCuentaObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IeResumenEstadoCuentaObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
