import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosSuministrosComponent } from './pagos-suministros.component';

describe('PagosSuministrosComponent', () => {
  let component: PagosSuministrosComponent;
  let fixture: ComponentFixture<PagosSuministrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosSuministrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosSuministrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
