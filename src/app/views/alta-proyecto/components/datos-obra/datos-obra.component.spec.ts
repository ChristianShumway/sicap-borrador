import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosObraComponent } from './datos-obra.component';

describe('DatosObraComponent', () => {
  let component: DatosObraComponent;
  let fixture: ComponentFixture<DatosObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
