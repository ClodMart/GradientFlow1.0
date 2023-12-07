/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaseChatUIComponent } from './base-chatUI.component';

describe('BaseChatUIComponent', () => {
  let component: BaseChatUIComponent;
  let fixture: ComponentFixture<BaseChatUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseChatUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseChatUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
