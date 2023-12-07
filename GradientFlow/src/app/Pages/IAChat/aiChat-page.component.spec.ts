import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiChatPageComponent } from './aiChat-page.component';

describe('Page1Component', () => {
  let component: AiChatPageComponent;
  let fixture: ComponentFixture<AiChatPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiChatPageComponent]
    });
    fixture = TestBed.createComponent(AiChatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
