import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteManoObraComponent } from './reporte-mano-obra.component';

describe('ReporteManoObraComponent', () => {
  let component: ReporteManoObraComponent;
  let fixture: ComponentFixture<ReporteManoObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteManoObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteManoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
