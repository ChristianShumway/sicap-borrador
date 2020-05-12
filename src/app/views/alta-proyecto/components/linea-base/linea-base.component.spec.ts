import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaBaseComponent } from './linea-base.component';

describe('LineaBaseComponent', () => {
  let component: LineaBaseComponent;
  let fixture: ComponentFixture<LineaBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
