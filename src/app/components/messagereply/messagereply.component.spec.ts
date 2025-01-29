import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagereplyComponent } from './messagereply.component';

describe('MessagereplyComponent', () => {
  let component: MessagereplyComponent;
  let fixture: ComponentFixture<MessagereplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagereplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagereplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
