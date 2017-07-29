import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoBlockComponent } from './more-info-block.component';

describe('MoreInfoBlockComponent', () => {
  let component: MoreInfoBlockComponent;
  let fixture: ComponentFixture<MoreInfoBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreInfoBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
