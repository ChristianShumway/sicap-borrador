import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCierreObraComponent } from './ver-cierre-obra.component';

describe('VerCierreObraComponent', () => {
  let component: VerCierreObraComponent;
  let fixture: ComponentFixture<VerCierreObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCierreObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCierreObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
