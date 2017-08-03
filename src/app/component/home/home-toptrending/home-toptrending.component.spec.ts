import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeToptrendingComponent } from './home-toptrending.component';

describe('HomeToptrendingComponent', () => {
  let component: HomeToptrendingComponent;
  let fixture: ComponentFixture<HomeToptrendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeToptrendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeToptrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
