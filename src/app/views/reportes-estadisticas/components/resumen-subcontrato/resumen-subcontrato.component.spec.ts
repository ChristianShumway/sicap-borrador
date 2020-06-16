import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSubcontratoComponent } from './resumen-subcontrato.component';

describe('ResumenSubcontratoComponent', () => {
  let component: ResumenSubcontratoComponent;
  let fixture: ComponentFixture<ResumenSubcontratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenSubcontratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenSubcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
