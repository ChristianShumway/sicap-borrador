import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerObraComponent } from './ver-obra.component';

describe('VerObraComponent', () => {
  let component: VerObraComponent;
  let fixture: ComponentFixture<VerObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
