import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderlinksComponent } from './headerlinks.component';

describe('HeaderlinksComponent', () => {
  let component: HeaderlinksComponent;
  let fixture: ComponentFixture<HeaderlinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderlinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
