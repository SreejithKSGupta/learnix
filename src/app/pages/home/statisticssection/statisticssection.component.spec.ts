import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticssectionComponent } from './statisticssection.component';

describe('StatisticssectionComponent', () => {
  let component: StatisticssectionComponent;
  let fixture: ComponentFixture<StatisticssectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticssectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticssectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
