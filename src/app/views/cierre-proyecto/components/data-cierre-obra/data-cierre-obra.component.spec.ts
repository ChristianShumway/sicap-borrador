import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCierreObraComponent } from './data-cierre-obra.component';

describe('DataCierreObraComponent', () => {
  let component: DataCierreObraComponent;
  let fixture: ComponentFixture<DataCierreObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCierreObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCierreObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
