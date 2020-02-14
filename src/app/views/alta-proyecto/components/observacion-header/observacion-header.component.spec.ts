import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionHeaderComponent } from './observacion-header.component';

describe('ObservacionComponent', () => {
  let component: ObservacionHeaderComponent;
  let fixture: ComponentFixture<ObservacionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
