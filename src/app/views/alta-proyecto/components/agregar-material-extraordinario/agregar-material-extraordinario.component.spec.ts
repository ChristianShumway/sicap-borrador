import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMaterialExtraordinarioComponent } from './agregar-material-extraordinario.component';

describe('AgregarMaterialExtraordinarioComponent', () => {
  let component: AgregarMaterialExtraordinarioComponent;
  let fixture: ComponentFixture<AgregarMaterialExtraordinarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarMaterialExtraordinarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMaterialExtraordinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
