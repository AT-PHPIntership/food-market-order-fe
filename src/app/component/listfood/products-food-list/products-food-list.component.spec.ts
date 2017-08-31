import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFoodListComponent } from './products-food-list.component';

describe('ProductsFoodListComponent', () => {
  let component: ProductsFoodListComponent;
  let fixture: ComponentFixture<ProductsFoodListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsFoodListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsFoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
