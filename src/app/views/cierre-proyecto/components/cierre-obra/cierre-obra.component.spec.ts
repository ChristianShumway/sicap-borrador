import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreObraComponent } from './cierre-obra.component';

describe('CierreObraComponent', () => {
  let component: CierreObraComponent;
  let fixture: ComponentFixture<CierreObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierreObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
