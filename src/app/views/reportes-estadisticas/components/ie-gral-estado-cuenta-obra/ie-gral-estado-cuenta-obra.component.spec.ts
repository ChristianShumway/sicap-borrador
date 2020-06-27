import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IeGralEstadoCuentaObraComponent } from './ie-gral-estado-cuenta-obra.component';

describe('IeGralEstadoCuentaObraComponent', () => {
  let component: IeGralEstadoCuentaObraComponent;
  let fixture: ComponentFixture<IeGralEstadoCuentaObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IeGralEstadoCuentaObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IeGralEstadoCuentaObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
