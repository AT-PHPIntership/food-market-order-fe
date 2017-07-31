import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRiceorderComponent } from './home-riceorder.component';

describe('HomeRiceorderComponent', () => {
  let component: HomeRiceorderComponent;
  let fixture: ComponentFixture<HomeRiceorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRiceorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRiceorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
