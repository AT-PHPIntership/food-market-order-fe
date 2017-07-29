import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListButtonCartComponent } from './list-button-cart.component';

describe('ListButtonCartComponent', () => {
  let component: ListButtonCartComponent;
  let fixture: ComponentFixture<ListButtonCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListButtonCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListButtonCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
