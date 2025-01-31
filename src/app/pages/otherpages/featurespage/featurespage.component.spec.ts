import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturespageComponent } from './featurespage.component';

describe('FeaturespageComponent', () => {
  let component: FeaturespageComponent;
  let fixture: ComponentFixture<FeaturespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturespageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
