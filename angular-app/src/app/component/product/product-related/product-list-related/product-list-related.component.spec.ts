import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListRelatedComponent } from './product-list-related.component';

describe('ProductListRelatedComponent', () => {
  let component: ProductListRelatedComponent;
  let fixture: ComponentFixture<ProductListRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
