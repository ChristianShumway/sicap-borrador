import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionExpedienteUnicoObraComponent } from './validacion-expediente-unico-obra.component';

describe('ValidacionExpedienteUnicoObraComponent', () => {
  let component: ValidacionExpedienteUnicoObraComponent;
  let fixture: ComponentFixture<ValidacionExpedienteUnicoObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacionExpedienteUnicoObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionExpedienteUnicoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
