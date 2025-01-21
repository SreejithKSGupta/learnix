import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacypageComponent } from './privacypage.component';

describe('PrivacypageComponent', () => {
  let component: PrivacypageComponent;
  let fixture: ComponentFixture<PrivacypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacypageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
