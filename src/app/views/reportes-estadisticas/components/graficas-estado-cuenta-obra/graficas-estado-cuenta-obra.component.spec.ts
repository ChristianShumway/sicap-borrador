import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasEstadoCuentaObraComponent } from './graficas-estado-cuenta-obra.component';

describe('GraficasEstadoCuentaObraComponent', () => {
  let component: GraficasEstadoCuentaObraComponent;
  let fixture: ComponentFixture<GraficasEstadoCuentaObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasEstadoCuentaObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasEstadoCuentaObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
