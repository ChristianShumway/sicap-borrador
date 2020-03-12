import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarMaterialesHerramientasComponent } from './solicitar-materiales-herramientas.component';

describe('SolicitarMaterialesHerramientasComponent', () => {
  let component: SolicitarMaterialesHerramientasComponent;
  let fixture: ComponentFixture<SolicitarMaterialesHerramientasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarMaterialesHerramientasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarMaterialesHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
