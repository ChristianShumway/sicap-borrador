import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontosProgramadosComponent } from './montos-programados.component';

describe('MontosProgramadosComponent', () => {
  let component: MontosProgramadosComponent;
  let fixture: ComponentFixture<MontosProgramadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontosProgramadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontosProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
