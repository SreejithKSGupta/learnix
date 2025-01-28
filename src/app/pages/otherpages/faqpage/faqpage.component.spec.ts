import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqpageComponent } from './faqpage.component';

describe('FaqpageComponent', () => {
  let component: FaqpageComponent;
  let fixture: ComponentFixture<FaqpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
