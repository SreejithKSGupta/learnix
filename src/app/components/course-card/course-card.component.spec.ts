import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardComponentnew } from './course-card.component';

describe('CourseCardComponent', () => {
  let component: CourseCardComponentnew;
  let fixture: ComponentFixture<CourseCardComponentnew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCardComponentnew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCardComponentnew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
