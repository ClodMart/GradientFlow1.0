import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGridComponent } from './base-grid.component';

describe('BaseGridComponent', () => {
  let component: BaseGridComponent;
  let fixture: ComponentFixture<BaseGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseGridComponent]
    });
    fixture = TestBed.createComponent(BaseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
