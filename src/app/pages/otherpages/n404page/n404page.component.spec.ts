import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N404pageComponent } from './n404page.component';

describe('N404pageComponent', () => {
  let component: N404pageComponent;
  let fixture: ComponentFixture<N404pageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [N404pageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(N404pageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
