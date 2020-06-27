import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCuentaObraComponent } from './estado-cuenta-obra.component';

describe('EstadoCuentaObraComponent', () => {
  let component: EstadoCuentaObraComponent;
  let fixture: ComponentFixture<EstadoCuentaObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoCuentaObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCuentaObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
