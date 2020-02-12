import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosListaComponent } from './conceptos-lista.component';

describe('ConceptosListaComponent', () => {
  let component: ConceptosListaComponent;
  let fixture: ComponentFixture<ConceptosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
