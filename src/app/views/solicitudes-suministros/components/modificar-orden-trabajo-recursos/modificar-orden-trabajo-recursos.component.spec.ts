import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOrdenTrabajoRecursosComponent } from './modificar-orden-trabajo-recursos.component';

describe('ModificarOrdenTrabajoRecursosComponent', () => {
  let component: ModificarOrdenTrabajoRecursosComponent;
  let fixture: ComponentFixture<ModificarOrdenTrabajoRecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarOrdenTrabajoRecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarOrdenTrabajoRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
