import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlanTrabajoComponent } from './lista-plan-trabajo.component';

describe('ListaPlanTrabajoComponent', () => {
  let component: ListaPlanTrabajoComponent;
  let fixture: ComponentFixture<ListaPlanTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPlanTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlanTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
