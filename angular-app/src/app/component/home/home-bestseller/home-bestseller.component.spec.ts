import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBestsellerComponent } from './home-bestseller.component';

describe('HomeBestsellerComponent', () => {
  let component: HomeBestsellerComponent;
  let fixture: ComponentFixture<HomeBestsellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBestsellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBestsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
