import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductCartComponent } from './list-product-cart.component';

describe('ListProductCartComponent', () => {
  let component: ListProductCartComponent;
  let fixture: ComponentFixture<ListProductCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
