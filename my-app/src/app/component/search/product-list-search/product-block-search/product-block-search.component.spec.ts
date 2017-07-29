import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBlockSearchComponent } from './product-block-search.component';

describe('ProductBlockSearchComponent', () => {
  let component: ProductBlockSearchComponent;
  let fixture: ComponentFixture<ProductBlockSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBlockSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBlockSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
