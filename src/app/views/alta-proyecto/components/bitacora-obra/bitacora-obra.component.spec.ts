import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraObraComponent } from './bitacora-obra.component';

describe('BitacoraObraComponent', () => {
  let component: BitacoraObraComponent;
  let fixture: ComponentFixture<BitacoraObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
