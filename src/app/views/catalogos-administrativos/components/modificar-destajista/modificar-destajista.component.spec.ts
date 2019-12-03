import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDestajistaComponent } from './modificar-destajista.component';

describe('ModificarDestajistaComponent', () => {
  let component: ModificarDestajistaComponent;
  let fixture: ComponentFixture<ModificarDestajistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarDestajistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDestajistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
