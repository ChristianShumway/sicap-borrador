import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDocumentoComponent } from './alta-documento.component';

describe('AltaDocumentoComponent', () => {
  let component: AltaDocumentoComponent;
  let fixture: ComponentFixture<AltaDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
