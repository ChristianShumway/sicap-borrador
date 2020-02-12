import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselEvidenciasComponent } from './carousel-evidencias.component';

describe('CarouselEvidenciasComponent', () => {
  let component: CarouselEvidenciasComponent;
  let fixture: ComponentFixture<CarouselEvidenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselEvidenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselEvidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
