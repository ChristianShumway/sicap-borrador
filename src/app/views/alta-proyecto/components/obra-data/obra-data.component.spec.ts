import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraDataComponent } from './obra-data.component';

describe('ObraDataComponent', () => {
  let component: ObraDataComponent;
  let fixture: ComponentFixture<ObraDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
