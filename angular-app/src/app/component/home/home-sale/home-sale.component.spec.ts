import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSaleComponent } from './home-sale.component';

describe('HomeSaleComponent', () => {
  let component: HomeSaleComponent;
  let fixture: ComponentFixture<HomeSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
