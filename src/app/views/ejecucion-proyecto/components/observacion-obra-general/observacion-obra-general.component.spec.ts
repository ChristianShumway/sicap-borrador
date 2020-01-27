import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionObraGeneralComponent } from './observacion-obra-general.component';

describe('ObservacionObraGeneralComponent', () => {
  let component: ObservacionObraGeneralComponent;
  let fixture: ComponentFixture<ObservacionObraGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionObraGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionObraGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
