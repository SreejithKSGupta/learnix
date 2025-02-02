import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutordashboardComponent } from './tutordashboard.component';

describe('TutordashboardComponent', () => {
  let component: TutordashboardComponent;
  let fixture: ComponentFixture<TutordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutordashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
