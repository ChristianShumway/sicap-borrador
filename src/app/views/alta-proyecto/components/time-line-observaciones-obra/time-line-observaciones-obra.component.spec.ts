import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineObservacionesObraComponent } from './time-line-observaciones-obra.component';

describe('TimeLineObservacionesObraComponent', () => {
  let component: TimeLineObservacionesObraComponent;
  let fixture: ComponentFixture<TimeLineObservacionesObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLineObservacionesObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineObservacionesObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
