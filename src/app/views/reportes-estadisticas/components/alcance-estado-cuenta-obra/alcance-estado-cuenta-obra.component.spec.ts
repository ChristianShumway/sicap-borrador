import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcanceEstadoCuentaObraComponent } from './alcance-estado-cuenta-obra.component';

describe('AlcanceEstadoCuentaObraComponent', () => {
  let component: AlcanceEstadoCuentaObraComponent;
  let fixture: ComponentFixture<AlcanceEstadoCuentaObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcanceEstadoCuentaObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcanceEstadoCuentaObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
