import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogviewpageComponent } from './blogviewpage.component';

describe('BlogviewpageComponent', () => {
  let component: BlogviewpageComponent;
  let fixture: ComponentFixture<BlogviewpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogviewpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogviewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
