import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePageCourseCardComponent } from './course-page-course-card.component';

describe('CoursePageCourseCardComponent', () => {
  let component: CoursePageCourseCardComponent;
  let fixture: ComponentFixture<CoursePageCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursePageCourseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursePageCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
