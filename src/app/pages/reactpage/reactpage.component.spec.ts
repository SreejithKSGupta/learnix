import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactpageComponent } from './reactpage.component';

describe('ReactpageComponent', () => {
  let component: ReactpageComponent;
  let fixture: ComponentFixture<ReactpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
