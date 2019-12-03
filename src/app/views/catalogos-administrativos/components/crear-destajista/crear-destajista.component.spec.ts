import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDestajistaComponent } from './crear-destajista.component';

describe('CrearDestajistaComponent', () => {
  let component: CrearDestajistaComponent;
  let fixture: ComponentFixture<CrearDestajistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearDestajistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDestajistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
