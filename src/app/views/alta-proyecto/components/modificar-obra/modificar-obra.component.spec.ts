import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarObraComponent } from './modificar-obra.component';

describe('ModificarObraComponent', () => {
  let component: ModificarObraComponent;
  let fixture: ComponentFixture<ModificarObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
