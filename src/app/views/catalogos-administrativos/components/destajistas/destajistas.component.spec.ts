import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestajistasComponent } from './destajistas.component';

describe('DestajistasComponent', () => {
  let component: DestajistasComponent;
  let fixture: ComponentFixture<DestajistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestajistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestajistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
