import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryBlockComponent } from './primary-block.component';

describe('PrimaryBlockComponent', () => {
  let component: PrimaryBlockComponent;
  let fixture: ComponentFixture<PrimaryBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
