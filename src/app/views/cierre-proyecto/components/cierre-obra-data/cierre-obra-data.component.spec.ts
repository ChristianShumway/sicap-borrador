import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreObraDataComponent } from './cierre-obra-data.component';

describe('CierreObraDataComponent', () => {
  let component: CierreObraDataComponent;
  let fixture: ComponentFixture<CierreObraDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierreObraDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreObraDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
