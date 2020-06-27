import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosExpedienteUnicoObraComponent } from './documentos-expediente-unico-obra.component';

describe('DocumentosExpedienteUnicoObraComponent', () => {
  let component: DocumentosExpedienteUnicoObraComponent;
  let fixture: ComponentFixture<DocumentosExpedienteUnicoObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosExpedienteUnicoObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosExpedienteUnicoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
