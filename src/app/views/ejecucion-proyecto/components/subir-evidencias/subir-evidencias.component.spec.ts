import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirEvidenciasComponent } from './subir-evidencias.component';

describe('SubirEvidenciasComponent', () => {
  let component: SubirEvidenciasComponent;
  let fixture: ComponentFixture<SubirEvidenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirEvidenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirEvidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
