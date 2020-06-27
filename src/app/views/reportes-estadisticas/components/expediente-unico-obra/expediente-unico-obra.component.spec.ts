import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteUnicoObraComponent } from './expediente-unico-obra.component';

describe('ExpedienteUnicoObraComponent', () => {
  let component: ExpedienteUnicoObraComponent;
  let fixture: ComponentFixture<ExpedienteUnicoObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteUnicoObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteUnicoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
