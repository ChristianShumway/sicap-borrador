import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarRecursosComponent } from './solicitar-recursos.component';

describe('SolicitarRecursosComponent', () => {
  let component: SolicitarRecursosComponent;
  let fixture: ComponentFixture<SolicitarRecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarRecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
