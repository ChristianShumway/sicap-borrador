import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionBodyComponent } from './observacion-body.component';

describe('ObservacionBodyComponent', () => {
  let component: ObservacionBodyComponent;
  let fixture: ComponentFixture<ObservacionBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
