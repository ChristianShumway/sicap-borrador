import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNotaBitacoraComponent } from './crear-nota-bitacora.component';

describe('CrearNotaBitacoraComponent', () => {
  let component: CrearNotaBitacoraComponent;
  let fixture: ComponentFixture<CrearNotaBitacoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearNotaBitacoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearNotaBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
