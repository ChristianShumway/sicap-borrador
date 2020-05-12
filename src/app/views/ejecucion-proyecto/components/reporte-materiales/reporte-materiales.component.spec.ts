import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMaterialesComponent } from './reporte-materiales.component';

describe('ReporteMaterialesComponent', () => {
  let component: ReporteMaterialesComponent;
  let fixture: ComponentFixture<ReporteMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
