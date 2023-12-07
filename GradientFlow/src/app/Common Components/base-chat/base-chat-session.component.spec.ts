import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseChatSessionComponent } from './base-chat-session.component';

describe('BaseChatComponent', () => {
  let component: BaseChatSessionComponent;
  let fixture: ComponentFixture<BaseChatSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseChatSessionComponent]
    });
    fixture = TestBed.createComponent(BaseChatSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
